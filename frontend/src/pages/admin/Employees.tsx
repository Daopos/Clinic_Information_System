import { useState } from "react";
import EmployeeFormModal from "../../components/admin/EmployeeFormModal";
import type { Employee, EmployeeFormData } from "../../types/IEmployee";
import { useEmployees } from "../../hooks/useEmployees";
import DeleteModal from "../../components/DeleteModal";
import toast, { Toaster } from "react-hot-toast";

const Employees = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [shouldResetForm, setShouldResetForm] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const {
    employees,
    createEmployee,
    deleteEmployee,
    createPending,
    deletePending,
    updatePending,
    updateEmployee,
  } = useEmployees();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>();

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  // Fixed: Added missing handleEditModal function
  const handleEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEmployee(null);
    setEditModal(false);
  };

  const handleSubmit = async (data: EmployeeFormData) => {
    toast.dismiss();
    try {
      await createEmployee(data);
      setOpenModal(false);
      setShouldResetForm(true);
      toast.success("Successfully created!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleDelete = async (): Promise<void> => {
    toast.dismiss();
    try {
      await deleteEmployee(deleteId!);
      setDeleteModal(false);
      toast.success("Successfully deleted!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const handleUpdate = async (data: EmployeeFormData) => {
    toast.dismiss();
    try {
      // Fixed: Pass the correct parameters to updateEmployee
      await updateEmployee({ id: selectedEmployee!.id, data });
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
              Employees
              <div className="flex justify-between">
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                  {/* Fixed: Updated description to match employees instead of medicines */}
                  Browse and manage a complete list of employees, including
                  their roles, contact information, and employment details.
                </p>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={handleModal}
                >
                  Add Employee
                </button>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, i) => (
                <tr
                  key={employee.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">
                    {`${employee.lastname}, ${employee.firstname} ${employee.middlename}`}
                  </td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.email}</td>

                  <td className="px-6 py-4 flex gap-4">
                    {/* <button className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                      View
                    </button> */}
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditModal(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        setDeleteId(employee.id);
                        handleDeleteModal();
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
      <EmployeeFormModal
        openModal={openModal}
        onSubmit={handleSubmit}
        onClose={handleModal}
        shouldReset={shouldResetForm}
        pending={createPending}
        mode="create"
      />
      <EmployeeFormModal
        openModal={editModal}
        // Fixed: Removed incorrect parameters and use handleUpdate directly
        onSubmit={handleUpdate}
        onClose={handleCloseEditModal}
        pending={updatePending}
        initialData={selectedEmployee}
        mode="edit"
      />

      <DeleteModal
        onClose={handleDeleteModal}
        openModal={deleteModal}
        onSubmit={handleDelete}
        pending={deletePending}
      />
      <Toaster />
    </>
  );
};

export default Employees;
