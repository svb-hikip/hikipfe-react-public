import PropTypes from 'prop-types';

const NoResultsFound = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-72">
      <h1 className="mt-6 text-xl font-semibold text-gray-800">
        {title || 'No Results Found'}
      </h1>
      <p className="mt-2 text-gray-600">
        {message || 'Sorry, we could not find any results matching your search.'}
      </p>
    </div>
  );
};

NoResultsFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default NoResultsFound;