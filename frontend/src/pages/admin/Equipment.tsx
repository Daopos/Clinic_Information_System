import { useEquipments } from "../../hooks/useEquipment";
import type { Equipment } from "../../types/IEquipment";

const Equipment = () => {
  const { equipments } = useEquipments();

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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Equipment;
