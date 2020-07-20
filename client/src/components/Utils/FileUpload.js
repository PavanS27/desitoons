import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios";

function FileUpload(props) {
  const [Image, setImage] = useState([]);
  const onDrop = (files) => {
    let formdata = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formdata.append("file", files[0]);
    Axios.post("/api/product/uploadImage", formdata, config).then((res) => {
      if (res.data.success) {
        setImage([...Image, res.data.image]);
        props.refreshFunction([...Image, res.data.image]);
      } else {
        alert("failed to upload image");
      }
    });
  };
  const onDelete = (image) => {
    const currentIndex = Image.indexOf(image);

    let newImages = [...Image];
    newImages.splice(currentIndex, 1);

    setImage(newImages);
    props.refreshFunction(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "300px",
              border: "1px solid lightgrey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Image.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minwidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
