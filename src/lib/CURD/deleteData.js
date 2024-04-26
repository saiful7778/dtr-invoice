export default async function deleteData(apiRoute, options) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + apiRoute, {
      ...options,
      method: "DELETE",
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
