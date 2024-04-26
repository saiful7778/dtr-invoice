export default async function readData(apiRoute, options) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + apiRoute, {
      ...options,
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
