import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";

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

function UploadProductPage() {
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [continentValue, setContinentValue] = useState(1);

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
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title>Upload Travel product</Title>
      </div>

      <Form onSubmit>
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
        <Button onClick>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
