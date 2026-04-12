const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {stats.map((stat) => (
      <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{stat.icon}</span>
          <span className={`${stat.color} w-8 h-8 rounded-full opacity-20`} />
        </div>
        <p className="text-2xl font-bold">{stat.value}</p>
        <p className="text-sm text-gray-500">{stat.title}</p>
      </div>
    ))}
  </div>
);

export default StatsGrid;
