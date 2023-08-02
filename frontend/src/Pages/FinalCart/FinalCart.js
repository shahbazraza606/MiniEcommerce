import React from "react";
import Card from "react-bootstrap/Card";
import "./FinalCart.css";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../../Features/CartSlice";
import { Button } from "react-bootstrap";
import { totalbillCount } from "../../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const FinalCart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const count = useSelector((state) => state.cart.count);
  const quan = useSelector((state) => state.cart.quantity);
  const [show,setshow]= React.useState(false);
  const handleShow = (item) => {
    dispatch(totalbillCount(item));
    setshow(true);}
  const handleClose = () => setshow(false);
  const dispatch = useDispatch();

  const stripePromise = loadStripe("pk_test_51N9QRVBquH5sItVXMWlOhSp0cfFec2SA9xr53X0R7Q5rjn6uWjLNuidJsfG90BZHnd46CJdeJs529qRR92kMBciF00WvzvsX6S");
  const handleIncrement = (item) => {
    // Dispatch the action to increase the quantity of the specific product
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleremove = (item) => {
    dispatch(removeFromCart(item));
  };

  let subtotals = 150;
  let totalPrice = 0;

  return (
    <div>
      <h1>FinalCart</h1>
      <div className="carting">
        <div className="rightcart">
          <Card>
            <Card.Header><a href="/">Back</a></Card.Header>
            <Card.Body>
              <Card.Text>
                {cart.length === 0 && <h1>Cart is Empty</h1>}
                {console.log("cart of final cart", cart)}
                {cart &&
                  cart.map((item) => (
                    <div className="cart" key={item.id}>
                      <div className="cartdata">
                        <div className="cartimg">
                          <img
                            className="imgcart"
                            src={`http://localhost:4000/${item.image}`}
                            alt="image"
                          />

                          <div className="detailcart">
                            <div className="cartname">
                              <h3><span>Name :</span>   {item.name}</h3>
                            </div>
                            <div>
                              {/* <h3><span>Quantity :</span> {item.quantity}</h3> Display the quantity */}
                            </div>
                            <div >
                              <h3> <span>Description :</span> {item.description}</h3>
                            </div>
                            <div className="cartprice">
                              <h3> <span>Price :</span> {item.price}</h3>
                            </div>
                            <div className="btnincre">
                              <button onClick={() => handleIncrement(item)}>+</button>
                              <p>{item.quantity}</p>
                              <button onClick={() => handleDecrement(item)}>-</button>
                              {/* <p>{(price *= item.price)}</p> */}
                            </div>
                            <div>
                              <Button varient="danger" onClick={() => handleremove(item)}> Remove from Cart</Button>
                            </div>
                            <br></br>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="leftcart">
          <Card>
            <Card.Body>
              <Card.Text>
                <div className="billsdiv">
                  <h2>Bill</h2>
                  {cart && cart.forEach((item) => (totalPrice += item.price ))}
                  <p>Price : {
                    count > 0 ? totalPrice * count :
                    totalPrice}
                  </p>
                  <p>Shipping: {totalPrice === 0 ? "No Charges" : subtotals}</p>
                  <p>Total: {totalPrice + subtotals === 150 ? "No Bill" : (count > 0 ? totalPrice * count + subtotals : totalPrice + subtotals)}</p>
                 {totalPrice + subtotals === 150 ? <h2>No Bill Found</h2> : <button onClick={() => handleShow( 
                  (count > 0 ? totalPrice * count + subtotals : totalPrice + subtotals))} >Buy Now</button>}
                  
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Elements stripe={stripePromise}>
            <PaymentForm show={show} handleClose={handleClose} handleShow={handleShow} />
          </Elements>
     
    </div>
  );
};

export default FinalCart;
