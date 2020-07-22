import React, { useEffect, useState } from "react";
import Axios from "axios";

function DetailedProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (res) => {
        setProduct(res.data[0]);
      }
    );
  }, []);
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
}

export default DetailedProductPage;
