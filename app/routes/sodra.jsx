import { useLoaderData } from "@remix-run/react"
import DepartureItem from "../components/DepartureItems";

export async function loader() {
  return await fetch(
    `https://transport.integration.sl.se/v1/sites/9530/departures`
  ).then((res) =>  res.json())
}

export const meta = () => {
  return [
    { title: "Trafic from Sodra" },
    { name: "description", content: "Sodra" },
  ];
};

export default function Index() {
  const data= useLoaderData()

  const trains = data.departures.filter((train) => train.line.transport_mode === "TRAIN")
  const cityBound = trains.filter((train) => train.direction_code === 2)
  const vegaBound = trains.filter((train) => train.direction_code === 1 && train.line.designation === "43")

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:mx-16">
      <h1 className="py-7 font-serif text-5xl font-bold">Södra station</h1>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Mot Vega</h2>
          <DepartureItem items={vegaBound} />
      </div>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Mot stan</h2>
          <DepartureItem items={cityBound} />
      </div>

    </div>
  )
}
