import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";

function CartPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart));
      }
    }
  }, []);
  return (
    <div>
      <h1>cra</h1>
    </div>
  );
}

export default CartPage;
