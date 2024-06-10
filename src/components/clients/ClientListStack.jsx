import { useState, useCallback, useEffect, Suspense } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { fetchClients } from '../../apis/ClientAPIs';
import { NavLink } from 'react-router-dom';
import Loader from '../layout/Loader/loader'

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
      <span>{totalCount} Clients</span>
      <Suspense fallback={<Loader />}>
      {/* adding a loader for lazy loading.. */}
      {isLoading ? <Loader /> :
      <InfiniteScroll
        loadMore={loadMoreClients}
        hasMore={hasMore}
        // loader={<div className="loader" key={0}>Loading ...</div>}
        loader={<Loader key={0}/>}
      >
        <ul role="list" className="divide-y divide-gray-200 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          {clientList.map((client, index) => ( //Adding a fallback value for the key attribute by using client.uuid || index.
            client && client.contact ? (
              <li key={client.uuid || index} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <NavLink to={`${client.uuid}`}>
                        <span className="absolute inset-0" /> 
                        {/* Adding a check to ensure client.client is defined before accessing client.client.id. */}
                        {client.client && client.client.id}|{client.contact.legal_first_name} {client.contact.legal_last_name}
                      </NavLink>
                    </p>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500">
                      {client.contact.contactemail_set && client.contact.contactemail_set.map(email => email.email).join(', ')}
                      {client.contact.contactphone_set && client.contact.contactphone_set.map(phone => phone.phone_number).join(', ')}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </li>
            ) : (
              <li key={index} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Client data is incomplete
                    </p>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      </InfiniteScroll>
}
</Suspense>
    </>
  );
}
