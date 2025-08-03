import { useState } from "react";
import MedFormModal from "../../../components/admin/MedFormModal";
import type { MedicineForm } from "../../../types/IMedicine";

const MedicineList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = async (data: MedicineForm) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Medcines
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
                  Add Medicine
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
                  Hand in
                </th>
                <th scope="col" className="px-6 py-3">
                  Expiration
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Abiraterone
                </th>
                <td className="px-6 py-4">123mg</td>
                <td className="px-6 py-4">Tablet</td>
                <td className="px-6 py-4">2024-08-02</td>
                <td className="px-6 py-4">2024-08-02</td>
                <td className="px-6 py-4">36</td>
                <td className="px-6 py-4">
                  <div className="bg-green-200 w-fit p-1 rounded-md">Good</div>
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <MedFormModal
        mode="create"
        openModal={openModal}
        onClose={handleModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default MedicineList;
