import { fetchUserAttributes } from 'aws-amplify/auth';
import { fetchPracticeBills } from '../../apis/PracticeAPIs';
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../components/layout/dashboardComps/helper'
import Loading from '../../components/utils/Loading';

export default function Billings() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch bills from the API
  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await fetchPracticeBills({params:{}});
      setBills(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch bills', error);
      setLoading(false);
    }
  };

  // Fetch bills on component mount
  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <>
    { loading ? (
      <>
        <span>Loading Bills...</span>
        <Loading />
      </>
      ):(
      <>
        {/* Debugging purpose: Display raw bills data */}
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
              Recent activity
            </h2>
          </div>
          <div className="mt-6 overflow-hidden border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <table className="w-full text-left">
                  <thead className="sr-only">
                    <tr>
                      <th>Amount</th>
                      <th className="hidden sm:table-cell">Client</th>
                      <th>More details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Fragment>
                      {bills.map((transaction) => (
                        <tr key={transaction.uuid}>
                          <td className="relative py-5 pr-6">
                            <div className="flex gap-x-6">
                              <div className="flex-auto">
                                <div className="flex items-start gap-x-3">
                                  <div className="text-sm font-medium leading-6 text-gray-900">$ {transaction.aggregate_pre_tax_value}</div>
                                </div>
                                {transaction.aggregate_tax_value ? (
                                  <div className="mt-1 text-xs leading-5 text-gray-500">$ {transaction.aggregate_tax_value} tax</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden py-5 pr-6 sm:table-cell">
                            <div className="text-sm leading-6 text-gray-900">
                              {transaction.client_name}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-gray-500">
                              {transaction.clinician} | {transaction.location}
                            </div>
                          </td>
                          <td className="py-5 text-right">
                            <div className="flex justify-end">
                            <Link
                              to={`/dashboard/billings/${transaction.uuid}`}
                              className={classNames(
                                'text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500'
                              )}
                            >
                              View<span className="hidden sm:inline"> transaction</span>
                                <span className="sr-only">
                                  , invoice #{transaction.number}, {transaction.billing_type}
                                </span>
                            </Link>
                              
                            </div>
                            <div className="mt-1 text-xs leading-5 text-gray-500">
                              Invoice <span className="text-gray-900">#{transaction.number}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )};
    </>
  );
}
