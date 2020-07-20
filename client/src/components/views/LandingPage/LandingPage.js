import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Row, Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../Utils/ImageSlider";

function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.post("/api/product/getProducts").then((res) => {
      if (res.data.success) {
        setProducts(res.data.products);

        console.log(res.data.products);
      } else {
        alert("failed to fecth product data");
      }
    });
  }, []);

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });
  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Lets Travel anywhere <Icon type="rocket" />
          </h2>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No posts yet..</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button>Load more</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
