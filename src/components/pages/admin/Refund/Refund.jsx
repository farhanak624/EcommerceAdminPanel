import React, { useEffect, useState } from "react";
import { getRefundRequest, payRefund } from "../../../../Api/ApiCall";
import WithdrawModal from "../../../Modals/WithdrawModal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Refund = () => {
  const [refundList, setRefundList] = useState([]);
  const [bankModal, setBankModal] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [currencyData, setCurrencyData] = useState();
  useEffect(() => {
    getRefundRequestData();
  }, []);

  const getRefundRequestData = async () => {
    try {
      const response = await getRefundRequest();
      console.log(response.data);
      setRefundList(response?.data?.data);
      setCurrencyData({
        currency: response?.data?.currency,
        symbol: response?.data?.currencySymbol,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onClose = () => {
    setBankModal(false);
  };
  return (
    <div>
      {bankModal && (
        <WithdrawModal
          callback={onClose}
          bankData={currentData}
          currency={currencyData}
        />
      )}
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
            {refundList.length > 0 ? (
              refundList.map((refund, index) => {
                return (
                  <tr class="border-b border-gray-200">
                    <td class="py-2 px-4 text-black text-xs font-normal">
                      KishorShoeMart
                    </td>
                    <td class="py-2 px-4 text-blue-600 text-xs font-medium underline">
                      <button
                        onClick={() => {
                          console.log("Bank Account", refund);
                          setCurrentData(refund);
                          setBankModal(true);
                        }}
                      >
                        Kotak Bank
                      </button>
                    </td>
                    <td class="py-2 px-4 text-black text-xs font-normal">
                      $2567
                    </td>
                    <td class="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from bubbling to the card div
                          Swal.fire({
                            title: "Are you sure?",
                            text: `Do you want to Mark this as paid  !`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // If confirmed, perform the delete operation
                              // You can place your delete logic here
                              payRefund({ id: refund?._id })
                                .then((data) => {
                                  if (result.isConfirmed) {
                                  }
                                  Swal.fire(
                                    "Deleted!",
                                    "Your Coupon has been deleted.",
                                    "success"
                                  );
                                  getRefundRequestData();
                                })
                                .catch((err) => {
                                  toast.error(err.response.data.message);
                                  Swal(
                                    "Sorry!",
                                    err.response.data.message,
                                    "error"
                                  );
                                });

                              // For demonstration purposes, let's just log the deletion
                              console.log("Item deleted");
                            }
                          });
                        }}
                        class={`${
                          refund?.ifRefundCompleted
                            ? "bg-green-700"
                            : "bg-amber-400 "
                        } text-white text-[10px] font-medium py-1 px-3 rounded`}
                      >
                        {refund?.ifRefundCompleted ? "Paid" : "Pay"}
                      </button>
                    </td>
                  </tr>
                );
              })
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

export default Refund;
