import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch(`https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=9733&timewindow=30`).then((res) => res.json());
  console.log(process.env.REALTIME_KEY, '<--- key')
  console.log(res, '<--- YOLO')
  return {status: "yolo"}
}

export default function Index() {
  const yolo = useLoaderData()
  console.log(yolo, '<--- WTF')
  return (
    <div>
    <h1>YOLO</h1>
    </div>
  );
}
