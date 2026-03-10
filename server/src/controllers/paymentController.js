const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/paymentModel");
const ServiceRequest = require("../models/serviceRequestModel");
const ProviderProfile = require("../models/providerProfileModel");

const createCheckoutSession = async (req, res) => {
  try {
    const { serviceRequestId, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: `Payment for service ${serviceRequestId}`,
            },
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    await Payment.create({
      serviceRequestId,
      stripeSessionId: session.id,
      amount,
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Payment session failed.",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const payment = await Payment.findOne({ stripeSessionId: session_id });

      if (!payment) {
        return res.status(404).json({
          message: "Payment not found.",
        });
      }

      if (payment.paymentStatus !== "Paid") {
        payment.paymentStatus = "Paid";
        payment.paidAt = new Date();
        await payment.save();

        const serviceRequest = await ServiceRequest.findByIdAndUpdate(
          payment.serviceRequestId,
          { paymentStatus: "Paid" },
          { returnDocument: "after" }
        );

        if (!serviceRequest) {
          return res.status(404).json({
            message: "Service Request not found.",
          });
        }

        console.log(serviceRequest);

        const updatedProvider = await ProviderProfile.findOneAndUpdate(
          { userId: serviceRequest.providerId },
          { $inc: { totalEarnings: Number(payment.amount) } },
          { returnDocument: "after" }
        );

        console.log(updatedProvider);

        if (!updatedProvider) {
          return res
            .status(404)
            .json({ message: "Provider Profile not found." });
        }
      }

      return res.json({
        success: true,
      });
    }

    res.json({
      success: false,
      message: "Payment not complete.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Payment verification failed.",
    });
  }
};

module.exports = { createCheckoutSession, verifyPayment };
