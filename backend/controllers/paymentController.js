const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay =
new Razorpay({
key_id:
process.env
.RAZORPAY_KEY_ID,
key_secret:
process.env
.RAZORPAY_KEY_SECRET,
});

/* =========================
Create Razorpay Order
========================= */

const createOrder =
async (
req,
res
) => {
try {
const {
amount,
} = req.body;


  if (
    !amount ||
    amount <= 0
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "Invalid amount",
      });
  }

  const options =
    {
      amount:
        Math.round(
          Number(
            amount
          ) * 100
        ),
      currency:
        "INR",
    };

  const order =
    await razorpay.orders.create(
      options
    );

  return res
    .status(200)
    .json(
      order
    );
} catch (error) {
  console.error(
    error
  );

  return res
    .status(500)
    .json({
      success:
        false,
      message:
        "Failed to create payment order",
    });
}


};

/* =========================
Verify Payment
========================= */

const verifyPayment =
async (
req,
res
) => {
try {
const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
} =
req.body;

  const body =
    razorpay_order_id +
    "|" +
    razorpay_payment_id;

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env
          .RAZORPAY_KEY_SECRET
      )
      .update(
        body
      )
      .digest(
        "hex"
      );

  if (
    expectedSignature !==
    razorpay_signature
  ) {
    return res
      .status(400)
      .json({
        success:
          false,
        message:
          "Payment verification failed",
      });
  }

  return res
    .status(200)
    .json({
      success:
        true,
      message:
        "Payment verified successfully",
    });
} catch (error) {
  console.error(
    error
  );

  return res
    .status(500)
    .json({
      success:
        false,
      message:
        "Payment verification error",
    });
}


};

module.exports = {
createOrder,
verifyPayment,
};
