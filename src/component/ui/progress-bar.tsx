export function ProgressBar({
  percent,
  color = "bg-green-500",
}: {
  percent: number;
  color?: string;
}) {
  return (
    <div className="h-4 w-full bg-gray-200 rounded-full">
      <div
        className={`h-full ${color} rounded-full`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
