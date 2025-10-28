const DashboardCard = ({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: string;
}) => (
  <div
    className={`${color} p-6 rounded-xl shadow hover:shadow-lg transition-all text-center`}
  >
    <h2 className="text-lg font-semibold text-defined-brown">{title}</h2>
    <p className="text-3xl font-bold text-defined-green mt-2">{count}</p>
  </div>
);

export default DashboardCard;