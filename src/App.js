import React, { useState } from "react";
import Upload from "./components/Upload";
import { Buffer } from "buffer";
import AWS from "aws-sdk";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [files, setFiles] = useState([]);

  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_REGION;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadImageToS3 = (file) => {
    console.log(file);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    console.log("params", params);

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  const handleUpload = (event) => {
    event.preventDefault();

    console.log("Uploading files");
    for (const file in files) {
      uploadImageToS3(files[file].file);
    }
    setFiles([]);
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <Upload
          accept=".jpg,.png,.jpeg,.svg"
          label="File Uploader"
          files={files}
          setFiles={setFiles}
          multiple
        />
        <button type="submit">Upload To S3</button>
      </form>
    </div>
  );
}

export default App;
