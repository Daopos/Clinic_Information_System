import { useState } from "react";
import { useEquipments } from "../../hooks/useEquipment";
import CreateEquipmentModal from "../../components/dentist/CreateEquipmentModal";
import type { EquipmentForm } from "../../types/IEquipment";
import equipmentService from "../../services/equipmentService";
import toast, { Toaster } from "react-hot-toast";

const Equipment = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const { equipments, refetch } = useEquipments();

  const handleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const handleSubmitCreate = async (data: EquipmentForm) => {
    try {
      await equipmentService.createEquipment(data);
      refetch();
      setOpenCreateModal(false);
      toast.success("Successfully Created!");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Equipments
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  Browse and manage a complete list of medicines, including
                  availability, dosage, expiration dates, and stock levels for
                  your inventory.
                </p>
                <button
                  onClick={handleCreateModal}
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add Equipment
                </button>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Equipment Name
                </th>
                <th scope="col" className="px-6 py-3">
                  quantity
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr
                  key={equipment.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {equipment.equipment_name}
                  </th>
                  <td className="px-6 py-4"> {equipment.total_quantity}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Add
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
      <Toaster />

      <CreateEquipmentModal
        onClose={handleCreateModal}
        openModal={openCreateModal}
        onSubmit={handleSubmitCreate}
      />
    </>
  );
};

export default Equipment;
