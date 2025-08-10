import { useState } from "react";
import { useMedicineLog } from "../../hooks/useMedicineLog";
import { transformDate } from "../../utils/transformDate";
import { Pagination } from "flowbite-react";

const MedicineLog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // pass currentPage and limit to your hook so it fetches correct page
  const { medicineLogs, totalPages } = useMedicineLog({
    page: currentPage,
    limit: 10,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Medicine Log
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse and manage a complete list of medicines, including
                  availability, dosage, expiration dates, and stock levels for
                  your inventory.
                </p>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Patient
                </th>
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
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Give Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Expiration
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medicineLogs.map((log) => (
                <tr
                  key={log.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {log.dispensed_to}
                  </th>
                  <td className="px-6 py-4">{log.medicine.med_name}</td>
                  <td className="w-max px-6 py-4">{log.medicine.dosage}</td>

                  <td className="w-max px-6 py-4">{log.medicine.form_med}</td>
                  <td className="w-max px-6 py-4">{log.quantity_dispensed}</td>
                  <td className="w-max px-6 py-4">
                    {transformDate(log.createdAt)}
                  </td>
                  <td className="w-max px-6 py-4">
                    {transformDate(log.medicineStock.expiration)}
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
        <div className="pb-5 flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages ?? 1}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default MedicineLog;
