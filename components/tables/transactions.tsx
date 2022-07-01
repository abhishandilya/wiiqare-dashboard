export default function TransactionTable({
  transactions,
}: {
  transactions?: WiiQare.Transaction[];
}) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {transactions && (
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Last updated
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Amount
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {transactions.map((transaction) => (
                        <tr key={transaction.hash}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
                            {new Date(transaction.lastUpdated).toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                            <div>
                              {transaction.paidAmount}{" "}
                              {transaction.paidCurrency}
                            </div>
                            <div className="text-gray-500">
                              {transaction.displayAmount}{" "}
                              {transaction.displayCurrency}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {transaction.balance} {transaction.displayCurrency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {!transactions && <p>Loading...</p>}
        </div>
      </div>
    </>
  );
}