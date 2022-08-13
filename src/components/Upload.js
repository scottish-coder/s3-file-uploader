import React, { useState, useRef, useEffect } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./Upload.styles";

const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Upload = ({ label, files, setFiles, ...otherProps }) => {
  const fileInputField = useRef();

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleNewFileUpload = (e) => {
    console.log(e.target);
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      addNewFiles(newFiles);
    }
  };

  const addNewFiles = (newFiles) => {
    console.log("adding files");
    for (let file of newFiles) {
      setFiles((files) => [...files, { file }]);
    }
    console.log(files);
  };

  const removeFile = (fileName) => {
    setFiles((files) => files.filter((file) => file.file.name !== fileName));
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <span>To Upload</span>
        <PreviewList>
          {files.map((file, index) => {
            const fileObj = file.file;
            let isImageFile = fileObj.type.split("/")[0] === "image";
            let fileName = fileObj.name;
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {
                    <ImagePreview
                      src={URL.createObjectURL(fileObj)}
                      alt={`file preview ${index}`}
                    />
                  }
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{fileObj.name}</span>
                    <aside>
                      <span>{convertBytesToKB(fileObj.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default Upload;
