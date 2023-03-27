import { useLoaderData } from "@remix-run/react"

export async function loader() {
  return await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=9733&timewindow=60`
  ).then((res) => res.json())
}

function deviationsStatus(deviations, journeyNumber) {
  if (deviations) {
    return deviations.map((deviation) => (
      <span
        key={journeyNumber + deviation.ImportanceLevel}
        className="ml-3 bg-white px-1 font-bold text-red-600"
      >
        {deviation.Text}
      </span>
    ))
  }
  return null
}

export default function Index() {
  const { ResponseData } = useLoaderData()
  const trains = ResponseData.Trains
  const buses = ResponseData.Buses
  const cityBound = trains.filter((train) => train.JourneyDirection === 2)
  const nonCityBound = trains.filter((train) => train.JourneyDirection === 1)

  return (
    <div className="mx-16 flex flex-col items-center justify-center gap-6">
      <h1 className="py-7 font-serif text-5xl font-bold">Vega station</h1>
      <div className="flex w-full flex-col gap-6 bg-sky-500 p-3">
        <div>
          <h2 className="text-2xl font-bold">Mot stan</h2>
          <ul>
            {cityBound.map((train) => (
              <li className="p-1 text-white odd:bg-black/25" key={train.JourneyNumber}>
                {train.LineNumber} {train.Destination} {train.DisplayTime}
                {deviationsStatus(train.Deviations, train.JourneyNumber)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Söderut</h2>
          <ul>
            {nonCityBound.map((train) => (
              <li className="p-1 text-white odd:bg-black/25" key={train.JourneyNumber}>
                {train.LineNumber} {train.Destination} {train.DisplayTime}
                {deviationsStatus(train.Deviations, train.JourneyNumber)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col bg-red-500 p-3">
        <h2 className="text-2xl font-bold">Bussar</h2>
        <ul>
          {buses.map((bus) => (
            <li className="p-1 text-white odd:bg-black/25" key={bus.JourneyNumber}>
              {bus.LineNumber} {bus.Destination} {bus.DisplayTime}
              {deviationsStatus(bus.Deviations, bus.JourneyNumber)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
