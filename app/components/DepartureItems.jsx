
import DeviationsStatus from "./DeviationStatus"

export default function DepartureItems({items}) {
  return (
    <ul>
      {items.map((item) => (
          <li
          className=" flex flex-col px-2 py-1 text-lg text-white odd:bg-black/25"
          key={item.scheduled}
        >
          <span className="flex justify-between">
            <span>
              {item.line.id} {item.direction}
            </span>
            {item.display}
          </span>
          <DeviationsStatus deviations={item.deviations} journeyNumber={item.line.id} />
        </li>
      ))}
    </ul>
  )
}
