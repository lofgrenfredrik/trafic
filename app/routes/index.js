import { useLoaderData } from "@remix-run/react"

export async function loader() {
  return await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REALTIME_KEY}&siteid=9733&timewindow=60`
  ).then((res) => res.json())
}

export default function Index() {
  const { ResponseData } = useLoaderData()
  const trains = ResponseData.Trains
  const buses = ResponseData.Buses
  const cityBound = trains.filter((train) => train.JourneyDirection === 2)
  const nonCityBound = trains.filter((train) => train.JourneyDirection === 1)
  console.log(nonCityBound, "<--- WTF")

  return (
    <div>
      <h1>Vega station</h1>
      <div>
        <h2>Mot stan</h2>
        <ul>
          {cityBound.map((train) => (
            <li key={train.JourneyNumber}>
              {train.LineNumber} {train.Destination} {train.DisplayTime}
            </li>
          ))}
        </ul>
        <h2>Bort från stan</h2>
        <ul>
          {nonCityBound.map((train) => (
            <li key={train.JourneyNumber}>
              {train.LineNumber} {train.Destination} {train.DisplayTime}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Busar</h2>
        <ul>
          {buses.map((bus) => (
            <li key={bus.JourneyNumber}>
              {bus.LineNumber} {bus.Destination} {bus.DisplayTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
