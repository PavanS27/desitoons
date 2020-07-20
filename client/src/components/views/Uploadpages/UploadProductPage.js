import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../Utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Asia" },
  { key: 3, value: "America" },
  { key: 4, value: "Canada" },
  { key: 5, value: "Australia" },
  { key: 6, value: "Japan" },
  { key: 7, value: "Russia" },
];

function UploadProductPage(props) {
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [continentValue, setContinentValue] = useState(1);
  const [imageInfo, setImageInfo] = useState([]);

  const onTitleChange = (e) => {
    setTitleValue(e.currentTarget.value);
  };
  const onDescChange = (e) => {
    setDescValue(e.currentTarget.value);
  };
  const onPriceChange = (e) => {
    setPriceValue(e.currentTarget.value);
  };
  const onContinentselect = (e) => {
    setContinentValue(e.currentTarget.value);
  };
  const updateImages = (newImage) => {
    console.log(newImage);
    setImageInfo(newImage);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !titleValue ||
      !descValue ||
      !priceValue ||
      !continentValue ||
      !imageInfo
    ) {
      alert("Fill all details");
    }
    const variables = {
      writer: props.user.userData._id,
      title: titleValue,
      description: descValue,
      price: priceValue,
      images: imageInfo,
      continents: continentValue,
    };
    Axios.post("/api/product/uploadProduct", variables).then((res) => {
      if (res.data.success) {
        alert("Product success upload");
        props.history.push("/");
      } else {
        alert("failes to upload product");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title>Upload Travel product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={titleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescChange} value={descValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={priceValue} type="number" />
        <select onChange={onContinentselect}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
