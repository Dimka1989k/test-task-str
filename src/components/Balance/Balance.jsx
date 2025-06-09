import "./Balance.style.css";
import React, { useState, useEffect } from "react";
import elipseBalance from '../../assets/Ellipse-balance.png';
import elipseForm from '../../assets/Ellipse-form-balance.png';
import elipseDown from "../../assets/Ellipse-balance-down.png"

const ProductDisplay = () => (  
<section className="container-balance">
      <img className="elipse-balance"src={elipseBalance} alt="elipseBalance" />
      <div className="form-balance">
        <img className="elipse-form" src={elipseForm} alt="elipseForm" />
        <p className="text-balance">Select Amount</p>
        <p className="text-small-balance">Recommended Plans</p>
        <div className="container-button">
               <button className="button-balance">
            <p className="number">5</p>
            <p className="minutes">minutes</p>
            <p className="plus-minutes">+3 free min</p>
            <div className="container-btn-price">
              <p className="price"> $14.97</p>
              <div className="container-price-line">
                <div className="no-price-line"> </div>
                <p className="no-price">$29.95</p>
              </div>
            </div>
          </button>
              <button className="button-balance">
            <p className="popular-balance">Most Popular</p>
            <p className="number">10</p>
            <p className="minutes">minutes</p>
            <p className="plus-minutes">+3 free min</p>
            <div className="container-btn-price">
              <p className="price"> $29.95</p>
              <div className="container-price-line">
                <div className="no-price-line"> </div>
                <p className="no-price">$59.99</p>
              </div>
            </div>
          </button>
          <button className="button-balance">
       
            <p className="number">15</p>
            <p className="minutes">minutes</p>
            <p className="plus-minutes">+3 free min</p>
            <div className="container-btn-price">
              <p className="price"> $44.92</p>
              <div className="container-price-line">
                <div className="no-price-line"></div>
                <p className="no-price">$89.85</p>
              </div>
            </div>
          </button>
        </div>
        <p className="text-small-balance-down">
          You can hang up any time. Unused funds will be <br /> returned to your
          account.
        </p>
         <form action="https://chat-strazen-media-1.onrender.com/create-checkout-session" method="POST">
        <button className="return-accaunt">Next</button>
         <img className="elipse-down" src={elipseDown} alt="elipseDown" />
         </form>
      </div>
    </section>
);


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);


export default function Balance() {
   const [message, setMessage] = useState(""); 
  useEffect(() => {
   
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
