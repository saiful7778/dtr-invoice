import { baseUrl } from "../server.config";

export default async function readData(apiRoute) {
  try {
    const res = await fetch(baseUrl + apiRoute, {
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
