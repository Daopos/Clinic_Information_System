import { useState } from "react";
import EmployeeFormModal from "../../components/admin/EmployeeFormModal";
import type { EmployeeFormData } from "../../types/IEmployee";
import { useEmployees } from "../../hooks/useEmployees";

const Employees = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [shouldResetForm, setShouldResetForm] = useState<boolean>(false);
  const { employees, createEmployee, deleteEmployee } = useEmployees();

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      await createEmployee(data);
      setOpenModal(false);
      setShouldResetForm(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
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
                  Browse and manage a complete list of medicines, including
                  availability, dosage, expiration dates, and stock levels for
                  your inventory.
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
                  Type
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
                    {" "}
                    {`${employee.lastname}, ${employee.firstname}, ${employee.middlename}`}
                  </td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button className="font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                      View
                    </button>
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        handleDelete(employee.id);
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
      />
    </>
  );
};

export default Employees;
