export function StatsBar() {
  const stats = [
    { value: "2000+", label: "Company" },
    { value: "10+", label: "Years Exp." },
    { value: "800+", label: "Hours of Digital" },
    { value: "150M+", label: "In Tracked Revenue" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value.replace(/\+/, "")}
                  <span className="text-[#A3E635]">+</span>
                </p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
