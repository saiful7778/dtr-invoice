export default async function readData(apiRoute) {
  try {
    const res = await fetch(process.env.NEXT_API_URL + apiRoute, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const resData = await res.json();
    return resData;
  } catch (err) {
    throw new Error(err);
  }
}
