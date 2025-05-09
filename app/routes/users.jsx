import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { client } from "../utils/mongo";
import { Button } from "../components/ui/button";
import { ObjectId } from "mongodb";

export default function Users() {
  const users = useLoaderData();
  // console.log(users);

  const user = useActionData();

  return (
    <main>
      <div>
        <h1>Users Page</h1>
      </div>
      <div className="grid md:grid-cols-1 gap-4 m-2">
        {/* {users.map((user, index) => {
          return <div key={index}>{user.name}</div>;
        })} */}
      </div>
      <div>
        <Form method="post">
          <input type="text" name="name" placeholder="name" />
          {/* <input type="email" name="email" placeholder="email" /> */}
          <Button>find User</Button>
        </Form>
      </div>
    </main>
  );
}

export async function loader() {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("users");
  const users = await collection.find({}).limit(10).toArray();
  return users;
}

export async function action({ request }) {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);

  const id = formEntry.name;

  // const email = formEntry.email;

  let db = await client.db("sample_mflix");
  let collection = await db.collection("users");
  let user = await collection.findOne({});
  return user;
}
