import { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ChevronRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { fetchClients } from '../../apis/ClientAPIs';
import { NavLink } from 'react-router-dom';
import Loading from '../utils/Loading';


export default function ClientListStack() {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const fetchAndProcess = async () => {
      setHasMore(false);
      try {
        const result = await fetchClients(page, 20);
        setPage(prevPage => prevPage + 1);
        setClientList(prevClients => [...prevClients, ...result.data]);
        setHasMore(!!result.nextPage);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('Failed to load more clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcess();
  }, [isLoading, page]);

  const loadMoreClients = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
  }, [isLoading]);

  return (
    <>
      {isLoading && !totalCount ? (
        <>
          <span className='text-gray-500'>Loading Clients ...</span>
          <Loading />
        </>
      ) : (
        <>
          <h2 className='text-red-600'>
            If you are not able to see clients list, you may have not logged in using the test credentials. Logout from current account using top right corner click "Tim Cook".
            Login using ID:svb@hikip.com PW:PaWv2b5Fy@n6BSi to see test data. Please do not remove this message in your commits.
          </h2>
          <p>--</p>
          <span className="block text-sm font-medium text-gray-700">{totalCount} Clients</span>
          <InfiniteScroll
            loadMore={loadMoreClients}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            <ul role="list" className="divide-y divide-gray-200 overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/10 sm:rounded-lg">
  {clientList.map(client => (
    <li key={client.uuid} className="relative flex flex-col sm:flex-row justify-between gap-y-4 gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div className="flex min-w-0 gap-x-4 pr-6 sm:w-1/3 sm:flex-none">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <NavLink to={`${client.uuid}`} className="hover:text-indigo-600">
              <span className="absolute inset-0" />
              {client.contact.legal_first_name} {client.contact.legal_last_name}
            </NavLink>
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
            {client.contact.contactemail_set.map(email => (
              <span key={email.email} className="truncate hover:underline">
                {email.email} ({email.type})
              </span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </p>
        </div>
      </div>
      <div className="flex min-w-0 gap-x-4 sm:w-1/3 sm:flex-none">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">Phones</p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" aria-hidden="true" />
            {client.contact.contactphone_set.map(phone => (
              <span key={phone.phone_number}>{phone.phone_number} ({phone.type})</span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
          </p>
        </div>
      </div>
      <div className="flex min-w-0 gap-x-4 sm:w-1/3 sm:flex-none">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">Client Details</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            {client.client_type}, {client.contact.relationship}
          </p>
        </div>
      </div>
      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400 self-center sm:self-auto" aria-hidden="true" />
    </li>
  ))}
</ul>

          </InfiniteScroll>
        </>
      )}
    </>
  );
}
