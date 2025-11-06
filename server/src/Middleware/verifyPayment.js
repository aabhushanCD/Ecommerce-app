// middlewares/verifyPayment.js
import axios from "axios";

export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentMethod, transactionId, totalAmount } = req.body;

    const validMethods = ["Online", "COD"];

    if (!paymentMethod || !validMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method. Must be 'Online' or 'COD'.",
        success: false,
      });
    }
    next();

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    // 🔍 Verify payment with Khalti API
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      {
        token: transactionId,
        amount: totalAmount * 100, // Khalti expects paisa
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    const data = response.data;

    if (data.state && data.state.name === "Completed") {
      console.log(" Payment verified successfully");
      req.paymentVerified = true; // pass info to next handler
      return next();
    }

    return res.status(400).json({
      message: "Payment not verified",
      success: false,
    });
  } catch (error) {
    console.error(
      "❌ Payment verification failed:",
      error.response?.data || error.message
    );
    return res.status(400).json({
      message: "Invalid or failed payment verification",
      success: false,
    });
  }
};
