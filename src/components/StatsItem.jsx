const StatsItem = ({ text, data }) => {
  return (
    <div className="w-full max-w-48 rounded-md border border-gray-400 bg-gray-100 px-2 py-6 text-center font-bold shadow-md dark:border-gray-600 dark:bg-gray-700">
      <div className="text-3xl">{data}</div>
      <div className="text-lg">{text}</div>
    </div>
  );
};

export default StatsItem;
