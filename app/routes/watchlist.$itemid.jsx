import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { ObjectId } from "mongodb";

// export default function Comment() {
//   const watchListItem = useLoaderData();
//   console.log(watchListItem);
//   return <main>{watchListItem && <div>{watchListItem.comment}</div>}</main>;
// }

export async function loader({ params }) {
  const id = params.itemid;

  let db = await client.db("sample_mflix");
  let collection = await db.collection("watchlist");

  await collection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        like: "liked",
      },
    }
  );

  return null;
}
