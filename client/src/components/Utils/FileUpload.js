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
        <div onClick>
          <img />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
