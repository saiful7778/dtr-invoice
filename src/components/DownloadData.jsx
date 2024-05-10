"use client";
import Button from "./Button";

const DownloadData = ({ inputData, fileName }) => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(inputData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.json`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} variant="primary" size="sm">
      Download json
    </Button>
  );
};

export default DownloadData;
