import React, { useEffect, useState } from "react";
import { refundRequest } from "../../../../Api/ApiCall";

const RefundHistory = () => {
  const [historylist, setHistorylist] = useState([]);
  const [CurrencySymbol, setCurrencySymbol] = useState();
  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const response = await refundRequest();
      console.log(response.data);
      setHistorylist(response?.data?.data);
      setCurrencySymbol(response?.data?.currencySymbol);
    } catch (error) {}
  };
  return (
    <div>
      <div class="overflow-x-auto mt-3">
        <table class="min-w-full bg-white rounded-md border">
          <thead>
            <tr class="bg-zinc-100">
              <th class="py-2 px-4 text-left text-black text-sm font-normal">
                User name
              </th>
              <th class="py-2 px-4 text-left text-black text-sm font-normal">
                Bank Account
              </th>
              <th class="py-2 px-4 text-left text-black text-sm font-normal">
                Amount
              </th>
              <th class="py-2 px-4 text-left text-black text-sm font-normal">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {historylist.length > 0 ? (
              historylist.map((history, i) => (
                <tr class="border-b border-gray-200">
                  <td class="py-2 px-4 text-black text-xs font-normal text-transform: capitalize">
                    {history?.bankHolderName}
                  </td>
                  <td class="py-2 px-4 text-blue-600 text-xs font-medium underline text-transform: capitalize">
                    {history?.bankName}
                  </td>
                  <td class="py-2 px-4 text-black text-xs font-normal">
                    {CurrencySymbol} {history?.refundAmount}
                  </td>
                  <td class="py-2 px-4">
                    <button
                      class={`${
                        history?.ifRefundCompleted
                          ? "bg-green-700"
                          : "bg-amber-400 "
                      } text-white text-[10px] font-medium py-1 px-3 rounded`}
                    >
                      {history?.ifRefundCompleted ? "Paid" : "Pay"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundHistory;
