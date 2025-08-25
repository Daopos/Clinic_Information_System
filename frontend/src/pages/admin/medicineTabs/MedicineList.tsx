import { useState } from "react";
import MedFormModal from "../../../components/admin/MedFormModal";
import type { Medicine, MedicineForm } from "../../../types/IMedicine";
import { useMedicines } from "../../../hooks/useMedicine";
import toast, { Toaster } from "react-hot-toast";

const MedicineList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  const [shouldResetForm, setShouldResetForm] = useState<boolean>(false);

  const [deleteId, setDeleteId] = useState<number>();

  const {
    medicines,
    createMedicine,
    deleteMedicine,
    updateMedicine,
    updatePending,
    refetch,
  } = useMedicines();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleEditModal = (medecine: Medicine) => {
    setSelectedMedicine(medecine);
    setEditModal(true);
  };
  const handleCloseEditModal = () => {
    setSelectedMedicine(null);
    setEditModal(false);
  };

  const handleSubmit = async (data: MedicineForm) => {
    toast.dismiss();

    try {
      await createMedicine(data);
      refetch();
      setOpenModal(false);
      setShouldResetForm(true);
      toast.success("Successfully created!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleDelete = async () => {
    toast.dismiss();

    try {
      await deleteMedicine(deleteId!);

      toast.success("Successfully deleted!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleUpdate = async (data: MedicineForm) => {
    toast.dismiss();
    console.log(data);
    try {
      await updateMedicine({ id: selectedMedicine!.id, data });
      refetch();

      handleCloseEditModal();
      toast.success("Successfully updated!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Medicines
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
              {medicines.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {medicine.med_name}
                  </th>
                  <td className="px-6 py-4">{medicine.dosage}</td>
                  <td className="px-6 py-4">{medicine.form_med}</td>
                  <td className="px-6 py-4">{medicine.totalQuantity}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`${
                        medicine.status === "High"
                          ? "bg-cyan-200"
                          : medicine.status === "Good"
                          ? "bg-green-200"
                          : medicine.status === "Low"
                          ? "bg-amber-300"
                          : "bg-red-200"
                      } w-fit p-1 rounded-md`}
                    >
                      {medicine.status}
                    </div>
                  </td>

                  <td className="px-6 py-4 flex gap-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditModal(medicine)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        setDeleteId(medicine.id);
                        handleDelete();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MedFormModal
        mode="create"
        openModal={openModal}
        onClose={handleModal}
        onSubmit={handleSubmit}
        shouldReset={shouldResetForm}
      />

      <MedFormModal
        mode="edit"
        openModal={editModal}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdate}
        initialData={selectedMedicine}
        pending={updatePending}
      />

      <Toaster />
    </>
  );
};

export default MedicineList;
