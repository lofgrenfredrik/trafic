export const meta = () => {
  return [
    { title: "Trafic" },
    { name: "description", content: "Trafic" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:mx-16">
      <h1 className="py-7 font-serif text-5xl font-bold">Stations</h1>

      <a className="underline text-2xl font-bold" href="/vega">VEGA</a>
      <a className="underline text-2xl font-bold" href="/sodra">SÖDRA</a>
      <a className="underline text-2xl font-bold" href="/city">CITY</a>

    </div>
  )
}
