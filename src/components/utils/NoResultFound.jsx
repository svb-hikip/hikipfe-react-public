const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-72">
      <h1 className="mt-6 text-xl font-semibold text-gray-800">
        No Results Found
      </h1>
      <p className="mt-2 text-gray-600">
        Sorry, we couldn't find any results matching your search.
      </p>
    </div>
  );
};

export default NoResultsFound;
