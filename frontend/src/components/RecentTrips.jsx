function RecentTrips() {
  const trips = [
    {
      place: "Dubai",
      date: "15 July 2026",
      status: "Confirmed",
    },
    {
      place: "Bali",
      date: "28 August 2026",
      status: "Planning",
    },
    {
      place: "Goa",
      date: "10 September 2026",
      status: "Completed",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-white mb-6">
        Recent Trips
      </h2>

      <div className="space-y-4">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <h3 className="text-xl font-bold text-white">
              {trip.place}
            </h3>

            <p className="text-zinc-400 mt-1">
              {trip.date}
            </p>

            <span className="inline-block mt-3 bg-cyan-500 px-3 py-1 rounded-lg text-white text-sm">
              {trip.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTrips;
