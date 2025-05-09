import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { client } from "../utils/mongo";

export default function Test() {
  const documents = useLoaderData();

  const name = useActionData();
  console.log(documents);
  return (
    <main>
      <div>
        <h1>create a new collection</h1>
      </div>
      <Form method="post" className="bg-slate-400 p-4">
        <input type="text" name="name" />
        <Button>Send</Button>
      </Form>
    </main>
  );
}

export async function loader({ params }) {
  const param = params.test;
  //   return param;
  let db = await client.db("sample_mflix");
  let collection = await db.collection("that's right");
  const documents = await collection.find().toArray();
  return documents;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);

  const name = formEntry.name;
  const param = params.test;

  //   console.log(param, "param in the action");

  let db = await client.db("sample_mflix");
  let collection = await db.collection(name);
  return await collection.insertOne({ name: name, param: param });
}
