const MedicineLog = () => {
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
                  GIve Date
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                ></th>
                <td className="px-6 py-4">
                  <div className="bg-green-200 w-fit p-1 rounded-md">Good</div>
                </td>
                <td className="w-max px-6 py-4">ss</td>

                <td className="w-max px-6 py-4">ss</td>
                <td className="w-max px-6 py-4">ss</td>
                <td className="w-max px-6 py-4">ss</td>

                <td className="px-6 py-4 flex gap-4">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedicineLog;
