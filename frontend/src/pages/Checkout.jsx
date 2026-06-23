import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  const handlePayment = async () => {
    try {
      const orderRes = await fetch(
        "/api/payment/order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            amount: totalPrice,
          }),
        }
      );

      const orderData =
        await orderRes.json();

      if (!orderRes.ok) {
        const fallback =
          window.confirm(
            "Razorpay unavailable. Use Student Test Mode?"
          );

        if (fallback) {
          return bypassPayment();
        }

        return alert(
          "Payment initialization failed"
        );
      }

      const options = {
        key: "rzp_test_dummykey123",

        amount:
          orderData.amount,

        currency:
          orderData.currency,

        name: "ShopNest",

        description:
          "Order Payment",

        order_id:
          orderData.id,

        handler:
          async function (
            response
          ) {
            const verifyRes =
              await fetch(
                "/api/payment/verify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify(
                    response
                  ),
                }
              );

            if (
              verifyRes.ok
            ) {
              const saveOrderRes =
                await fetch(
                  "/api/orders",
                  {
                    method:
                      "POST",
                    headers: {
                      "Content-Type":
                        "application/json",
                      Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(
                      {
                        items:
                          cartItems,
                        totalAmount:
                          totalPrice,
                        address,
                        paymentId:
                          response.razorpay_payment_id,
                      }
                    ),
                  }
                );

              if (
                saveOrderRes.ok
              ) {
                dispatch(
                  clearCart()
                );

                navigate(
                  "/ordersuccess"
                );
              } else {
                alert(
                  "Order saving failed"
                );
              }
            } else {
              alert(
                "Payment verification failed"
              );
            }
          },

        prefill: {
          name:
            address.fullName,
          email:
            user?.email,
          contact:
            "9999999999",
        },

        theme: {
          color:
            "#f97316",
        },
      };

      const rzp1 =
        new window.Razorpay(
          options
        );

      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment =
    async () => {
      const saveOrderRes =
        await fetch(
          "/api/orders",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${user.token}`,
            },

            body: JSON.stringify(
              {
                items:
                  cartItems,

                totalAmount:
                  totalPrice,

                address,

                paymentId:
                  "bypass_" +
                  Date.now(),
              }
            ),
          }
        );

      if (
        saveOrderRes.ok
      ) {
        dispatch(
          clearCart()
        );

        navigate(
          "/ordersuccess"
        );
      }
    };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (!user) {
      alert(
        "Please login first"
      );

      navigate(
        "/login"
      );

      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">

      <div className="checkout-header">

        <span className="checkout-badge">
          🔒 Secure Checkout
        </span>

        <h2>
          Complete Your
          <span className="gradient-text">
            {" "}
            Order
          </span>
        </h2>

        <p>
          Fast delivery,
          secure payment &
          premium shopping
          experience.
        </p>

      </div>

      <div className="checkout-content">

        <form
          onSubmit={
            handleSubmit
          }
          className="shipping-form"
        >

          <h3>
            Shipping Address
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            required
            value={
              address.fullName
            }
            onChange={(
              e
            ) =>
              setAddress({
                ...address,
                fullName:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="text"
            placeholder="Street Address"
            required
            value={
              address.street
            }
            onChange={(
              e
            ) =>
              setAddress({
                ...address,
                street:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="text"
            placeholder="City"
            required
            value={
              address.city
            }
            onChange={(
              e
            ) =>
              setAddress({
                ...address,
                city:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="text"
            placeholder="Postal Code"
            required
            value={
              address.postalCode
            }
            onChange={(
              e
            ) =>
              setAddress({
                ...address,
                postalCode:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="text"
            placeholder="Country"
            required
            value={
              address.country
            }
            onChange={(
              e
            ) =>
              setAddress({
                ...address,
                country:
                  e.target
                    .value,
              })
            }
          />

          <div className="order-summary-card">

            <h3>
              Order Summary
            </h3>

            <div className="summary-row">
              <span>
                Products
              </span>

              <span>
                {
                  cartItems.length
                }
              </span>
            </div>

            <div className="summary-row">
              <span>
                Total Amount
              </span>

              <span>
                ₹
                {totalPrice.toFixed(
                  2
                )}
              </span>
            </div>

          </div>

          <div className="checkout-summary">

            <h4>
              Total Payable:
              ₹
              {totalPrice.toFixed(
                2
              )}
            </h4>

            <button
              type="submit"
              className="btn"
            >
              🔒 Pay Securely
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Checkout;