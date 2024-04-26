export default async function createData(apiRoute, inputData) {
  try {
    const res = await fetch(process.env.NEXT_API_URL + apiRoute, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    throw new Error(err);
  }
}
