import { useLoaderData } from "@remix-run/react"

export async function loader() {
  return await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=9530&timewindow=60`
  ).then((res) => res.json())
}

export const meta = () => {
  return [
    { title: "Trafic from Sodra" },
    { name: "description", content: "Sodra" },
  ];
};

function deviationsStatus(deviations, journeyNumber) {
  if (deviations) {
    return deviations.map((deviation) => (
      <span
        key={journeyNumber + deviation.ImportanceLevel}
        className="bg-white p-1 font-bold text-red-600 my-2"
      >
        {deviation.Text}
      </span>
    ))
  }
  return null
}

function departureItems(item) {
  return (
    <li
      className=" flex flex-col px-2 py-1 text-lg text-white odd:bg-black/25"
      key={item.JourneyNumber}
    >
      <span className="flex justify-between">
        <span>
          {item.LineNumber} {item.Destination}
        </span>
        {item.DisplayTime}
      </span>
      {deviationsStatus(item.Deviations, item.JourneyNumber)}
    </li>
  )
}

export default function Index() {
  const { ResponseData } = useLoaderData()

  const trains = ResponseData.Trains
  const cityBound = trains.filter((train) => train.JourneyDirection === 2)
  const nonCityBound = trains.filter((train) => train.JourneyDirection === 1)

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:mx-16">
      <h1 className="py-7 font-serif text-5xl font-bold">Vega station</h1>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Mot Vega</h2>
          <ul>{nonCityBound.filter((train) => train.LineNumber === "43").map((train) => departureItems(train))}</ul>
      </div>

      <div className="w-full max-w-[700px] bg-sky-500 p-3">
          <h2 className="text-2xl font-bold">Mot stan</h2>
          <ul>{cityBound.map((train) => departureItems(train))}</ul>
      </div>

    </div>
  )
}
