"use client";
import Button from "./Button";

const DownloadData = ({ inputData }) => {
  const handleDownload = () => {
    const url = window.URL.createObjectURL(
      new Blob([JSON.stringify(inputData)], { type: "text/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} variant="primary" size="sm" download>
      Download json
    </Button>
  );
};

export default DownloadData;
