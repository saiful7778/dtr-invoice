export default async function updateData(apiRoute, inputData, options) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + apiRoute, {
      ...options,
      method: "PATCH",
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
