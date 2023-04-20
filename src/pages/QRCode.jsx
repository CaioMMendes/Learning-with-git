import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import QRCode from "react-qr-code";
import QrCodeLink from "qrcode";
import Button from "../components/smallComponents/Button";

const QrCode = () => {
  const [qrCodeInput, setQrCodeInput] = useState("");
  const [qrCodeLink, setQrCodeLink] = useState("");
  const [generateQr, setGenerateQr] = useState("");
  const onChangeQrCodeInput = (e) => {
    setQrCodeInput(e.target.value);
  };

  const handdleQrCode = async (event) => {
    event.preventDefault();
    if (qrCodeInput === "") {
      return alert("Insira uma Url");
    }
    try {
      setGenerateQr(qrCodeInput);
      try {
        QrCodeLink.toDataURL(
          qrCodeInput,
          {
            width: 600,
            margin: 3,
            errorCorrectionLevel: "H",
          },
          function (err, url) {
            setQrCodeLink(url);
          }
        );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handdleDownload = () => {
    if (qrCodeLink === "") {
      return alert("Gere um QrCode primeiro");
    }
    window.location.href = qrCodeLink;
  };

  return (
    <div className="containerCss">
      <PageTitle pageTitle="Qr code" />
      <form onSubmit={handdleQrCode}>
        <div className="flex justify-center items-center w-full h-full flex-col min-h-[calc(100vh-139px)]">
          <div
            className={
              generateQr !== ""
                ? `h-[22%] w-[22%] pb-5`
                : "h-[22%] w-[22%] pb-5 opacity-0 invisible"
            }
          >
            <QRCode
              size={256}
              style={{ width: "100%", height: "100%" }}
              level="H"
              value={generateQr}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="w-full  flex justify-center items-center ">
            <input
              className="w-5/12 h-10 text-2xl pl-2 outline-none border rounded-1xl -border--verde -text--colorMenuHover"
              type="text"
              name="Link"
              autoComplete="off"
              maxLength={1000}
              autoFocus
              value={qrCodeInput}
              placeholder="Insira um link"
              onChange={(e) => {
                onChangeQrCodeInput(e);
              }}
            />
          </div>
          <div className="flex ">
            <Button className={"!w-44 !h-7"} onClick={handdleQrCode}>
              Gerar QRCode
            </Button>

            <a
              href={qrCodeLink === "" ? undefined : qrCodeLink}
              download={`Qrcode.png`}
            >
              <Button
                className={`${generateQr !== "" ? "" : "!hidden"} !w-44 !h-7`}
                onClick={handdleDownload}
                typeButton="button"
              >
                Baixar QrCode
              </Button>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QrCode;
