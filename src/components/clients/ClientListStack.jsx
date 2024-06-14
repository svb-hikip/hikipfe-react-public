import { useState, useCallback, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ChevronRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { fetchClients } from '../../apis/ClientAPIs';
import { NavLink } from 'react-router-dom';
import Loading from '../utils/Loading';
import SearchInput from "../utils/SearchInput";
import NoResultFound from "../utils/NoResultFound";
import ClientForm from '../forms/ClientForm';

export default function ClientListStack() {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(null);
  const [query, setQuery] = useState("");
  const [isSideOverOpen, setIsSideOverOpen] = useState(false);
  const isFirstRender = useRef(true);

  const loadMoreItems = async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true)
    try {
      const result = await fetchClients({ params: { 'page': page, 'name': query } });
      const newItems = result.data;
      setClientList((prevItems) => [...prevItems, ...newItems]);
      setTotalCount(result.totalCount)
      if (!result.nextPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false)
      setPage((prevValue) => prevValue + 1)
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setClientList([]);
      setPage(1);
      setHasMore(true);
      setTotalCount(null);
    }
  }, [query]);

  return (
    <>
      <h2 className='text-red-600'>
        If you are not able to see clients list, you may have not logged in using the test credentials. Logout from current account using top right corner click "Tim Cook".
        Login using ID:svb@hikip.com PW:PaWv2b5Fy@n6BSi to see test data. Please do not remove this message in your commits.
      </h2>
      <p>--</p>
      <div className='flex justify-end'>
        <button
          className="inline-flex justify-around rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setIsSideOverOpen(true)}
        >
          Add New Client
        </button>
      </div>
      <div className="flex justify-start items-center h-auto py-4">
        <SearchInput className="" query={query} setQuery={setQuery} placeholder={"Search Clients..."} />

      </div>
      <span className="block text-sm font-medium text-gray-700">{totalCount} Clients</span>
      {isLoading && !totalCount ? (
        <>
          <span className='text-gray-500'>Loading Clients ...</span>
          <Loading />
        </>
      ) : totalCount === 0 ? (
        <NoResultFound title={'You have No clients'} message={'Add a new client to begin'} />
      ) : (
        <>
          <>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMoreItems}
              hasMore={hasMore}
              loader={<div className="loader" key={0}>Loading...</div>}
            >
              <ul role="list" className="divide-y divide-gray-200 overflow-hidden bg-white">
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
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {client.contact.contactemail_set.map(email => (
                            <span key={email.email} className="flex items-center">
                              <svg
                                data-slot="icon"
                                fill="none"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-4 w-4 text-green-500 mr-2"
                              >
                                <path
                                  strokeLinecap="flat"
                                  strokeLinejoin="round"
                                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                              </svg>
                              <span className="truncate hover:underline">{email.email} <span className="inline-flex items-center px-2 py-0.5 mx-2 my-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{email.type}</span></span>
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="flex min-w-0 gap-x-4 sm:w-1/3 sm:flex-none">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Phones</p>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          {client.contact.contactphone_set.map(phone => (
                            <div key={phone.phone_number} className="flex items-center">
                              <svg
                                data-slot="icon"
                                fill="none"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-4 w-5 text-red-400 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                />
                              </svg>
                              <span className="truncate hover:underline">{phone.phone_number} <span className="inline-flex items-center px-2 py-0.5 mx-2 my-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{phone.type}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex min-w-0 gap-x-4 sm:w-1/3 sm:flex-none">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">Client Details</p>
                        {/* Added the badges and pills here.. still we need to iprove it */}
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {client.client_type}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {client.contact.relationship}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400 self-center sm:self-auto" aria-hidden="true" />
                  </li>
                ))}
              </ul>

            </InfiniteScroll>

          </>

          <ClientForm isOpen={isSideOverOpen} setIsOpen={setIsSideOverOpen} />
        </>
      )}
    </>
  )
}
