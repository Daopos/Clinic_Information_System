import { useState } from "react";
import { useMedicineStock } from "../../hooks/useMedicineStocks";
import { transformDate } from "../../utils/transformDate";
import StockFormModal from "../../components/pharmacist/StockFormModal";
import toast, { Toaster } from "react-hot-toast";
import type { MedicineStockForm } from "../../types/IMedicineStock";

const Medicine = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [resetForm, setShouldResetForm] = useState<boolean>(false);

  const { medicineStocks, createStock, createPending } = useMedicineStock();

  const handleSubmit = async (data: MedicineStockForm) => {
    toast.dismiss();
    console.log(data);
    try {
      await createStock(data);
      setOpenModal(false);
      setShouldResetForm(true);
      toast.success("Successfully created!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Stock
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse and manage a complete list of medicines, including
                  availability, dosage, expiration dates, and stock levels for
                  your inventory.
                </p>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={handleModal}
                >
                  Add Stock
                </button>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Medicine name
                </th>
                <th scope="col" className="px-6 py-3">
                  Dosage
                </th>
                <th scope="col" className="px-6 py-3">
                  Form of Medicines
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Hand_in
                </th>
                <th scope="col" className="px-6 py-3">
                  Expiration
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medicineStocks.map((stock) => (
                <tr
                  key={stock.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {stock.medicine?.med_name}
                  </th>
                  <td className="px-6 py-4">{stock.medicine?.dosage}</td>
                  <td className="px-6 py-4">{stock.medicine?.form_med}</td>
                  <td className="px-6 py-4">{stock.quantity}</td>
                  <td className="px-6 py-4">{transformDate(stock.hand_in)}</td>
                  <td className="px-6 py-4">
                    {transformDate(stock.expiration)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="bg-green-200 w-fit p-1 rounded-md">
                      Good
                    </div>
                  </td>

                  <td className="px-6 py-4 flex gap-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StockFormModal
        mode="create"
        openModal={openModal}
        onClose={handleModal}
        onSubmit={handleSubmit}
        pending={createPending}
        shouldReset={resetForm}
      />

      <Toaster />
    </>
  );
};

export default Medicine;
