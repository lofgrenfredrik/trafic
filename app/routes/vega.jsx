import { useLoaderData } from "@remix-run/react"
import DepartureItem from "../components/DepartureItems";

export async function loader() {
  return await fetch(
    `https://transport.integration.sl.se/v1/sites/9733/departures`
  ).then((res) =>  res.json())
}

export const meta = () => {
  return [
    { title: "Trafic in Vega" },
    { name: "description", content: "Vega" },
  ];
};

export default function Index() {
  const data= useLoaderData()
  const bus837 = data.departures.filter((bus) => bus.line.id === 837 && bus.line.transport_mode === "BUS")
  const trains = data.departures.filter((train) => train.line.transport_mode === "TRAIN")
  const cityBound = trains.filter((train) => train.direction_code === 2)
  const nonCityBound = trains.filter((train) => train.direction_code === 1)

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:mx-16">
      <h1 className="py-7 font-serif text-5xl font-bold">Vega station</h1>

      <div className="w-full max-w-[700px] bg-red-500 p-3">
        <h2 className="text-2xl font-bold">Buss 837</h2>
        <DepartureItem items={bus837} />
      </div>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Mot stan</h2>
          <DepartureItem items={cityBound} />
      </div>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Söderut</h2>
          <DepartureItem items={nonCityBound} />
      </div>

    </div>
  )
}
