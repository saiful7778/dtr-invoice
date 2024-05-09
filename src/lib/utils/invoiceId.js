export default function invoiceId(inputData) {
  return inputData.toString().padStart(5, "0");
}
