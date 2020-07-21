import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Icon, Row, Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../Utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(variables);
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

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((res) => {
      if (res.data.success) {
        setProducts([...products, ...res.data.products]);
        setPostSize(res.data.postSize);

        console.log([...products, ...res.data.products]);
      } else {
        alert("failed to fecth product data");
      }
    });
  };
  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
    };
    getProducts(variables);
    setSkip(skip);
  };

  const handleFilters = (filters, category) => {};
  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Lets Travel anywhere <Icon type="rocket" />
          </h2>
        </div>

        <CheckBox
          handleFilters={(filters) => handleFilters(filters, "continents")}
        />

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
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load more</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
