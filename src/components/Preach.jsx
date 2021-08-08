import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfFile from "./PreachPdf/PdfFile";
import logo from "../mdf_logo.png";

const { TextArea } = Input;

const Preach = () => {
  const [preachDate, setPreachDate] = useState(null);
  const [preachText, setPreachText] = useState(null);
  const [canSaveFile, setCanSaveFile] = useState(false);

  useEffect(() => {
    if (!preachDate) {
      const date = new Date();
      setPreachDate(GenerateDate(date));
    }
  }, [preachDate]);

  const GenerateDate = (date) => {
    let systemDate;
    if (date.getDate() < 10) {
      systemDate = `0${date.getDate()}/`;
    } else {
      systemDate = `${date.getDate()}/`;
    }

    if (date.getMonth() + 1 < 10) {
      systemDate += `0${date.getMonth() + 1}/`;
    } else {
      systemDate += `${date.getMonth() + 1}/`;
    }

    systemDate += date.getUTCFullYear();

    return systemDate;
  };

  const OnChangePreachText = (keyDownInput) => {
    let text = keyDownInput.currentTarget.value;
    if(text.trim() !== ""){
      setCanSaveFile(true)
      setPreachText(text);
    }
    else{
      setCanSaveFile(false)
    }
  };

  const SaveTextToSimpleFile = () => {
    const element = document.createElement("a");
    const file = new Blob([preachText], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `Enseñanza del ${preachDate}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="preach-container">
      <div>
        <img className="img-logo" src={logo} alt="Mundo de Fe" />
      </div>
      <h2>Enseñanza del: {preachDate} </h2>
      <TextArea
        className="preach-text"
        rows={15}
        onChange={OnChangePreachText}
      />
      <div className="preach-buttons-options">
        <Button
          type="primary"
          disabled={!canSaveFile}
          className="m-b-10"
          onClick={SaveTextToSimpleFile}
        >
          Guardar como archivo de texto
        </Button>
        {canSaveFile ? (
          <PDFDownloadLink
            document={
              <PdfFile preachText={preachText} preachDate={preachDate} />
            }
            fileName={`Enseñanza del ${preachDate}`}
            className="ant-btn ant-btn-primary"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Guardar como Pdf" : "Guardar como Pdf"
            }
          </PDFDownloadLink>
        ) : (
          <Button type="primary" disabled={true} className="m-b-10">
            Guardar como Pdf
          </Button>
        )}
      </div>
    </div>
  );
};

export default Preach;
