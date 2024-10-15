
export default function deviationsStatus({deviations, journeyNumber}) {
  if (deviations) {
    return deviations.map((deviation) => (
      <span
        key={journeyNumber + deviation.importance_level}
        className="bg-white p-1 font-bold text-red-600 my-2"
      >
        {deviation.message}
      </span>
    ))
  }
  return null
}
