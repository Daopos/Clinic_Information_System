import { useMedicineLog } from "../../../hooks/useMedicineLog";
import { transformDate } from "../../../utils/transformDate";

const MedicineHistory = () => {
  const { medicineLogs } = useMedicineLog();

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Medicine logs
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
                  Given By
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3">
                  Medicine
                </th>
                <th scope="col" className="px-6 py-3">
                  quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  given date
                </th>
              </tr>
            </thead>
            <tbody>
              {medicineLogs.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th className="px-6 py-4">
                    {medicine.pharmacist?.lastname},
                    {medicine.pharmacist.firstname},+
                    {medicine.pharmacist?.middlename}
                  </th>
                  <td className="px-6 py-4">{medicine.dispensed_to}</td>
                  <td className="px-6 py-4">{medicine.medicine.med_name}</td>
                  <td className="px-6 py-4">{medicine.quantity_dispensed}</td>
                  <td className="px-6 py-4">
                    {transformDate(medicine.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicineHistory;
