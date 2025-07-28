import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Employee, EmployeeFormData } from "../types/IEmployee";
import employeeService from "../services/employeeService";

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: employeeService.getEmployees,
  });

  const {
    mutateAsync: createEmployee,
    isSuccess: createSuccess,
    isPending: createPending,
    isError: createError,
  } = useMutation({
    mutationFn: employeeService.createEmployee,
    onSuccess: (newEmployee) => {
      // queryClient.invalidateQueries({ queryKey: ["employees"] });

      queryClient.setQueryData<Employee[]>(["employees"], (old = []) => [
        ...old,
        newEmployee,
      ]);
    },
  });

  const {
    mutateAsync: deleteEmployee,
    isSuccess: deleteSuccess,
    isPending: deletePending,
    isError: deleteError,
  } = useMutation({
    mutationFn: employeeService.deleteEmployee,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Employee[]>(["employees"], (old = []) =>
        old.filter((employee) => employee.id !== deletedId)
      );
    },
  });

  const {
    mutateAsync: updateEmployee,
    isSuccess: updateSuccess,
    isPending: updatePending,
    isError: updateError,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EmployeeFormData }) =>
      employeeService.updateEmployees(id, data),
    onSuccess: (updatedEmployee) => {
      queryClient.setQueryData<Employee[]>(["employees"], (old = []) =>
        old.map((emp) =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
    },
  });
  return {
    employees,
    isLoading,
    isError,
    error,

    refetchEmployees: refetch,

    createEmployee,
    createSuccess,
    createPending,
    createError,

    deleteEmployee,
    deleteSuccess,
    deletePending,
    deleteError,

    updateEmployee,
    updateSuccess,
    updatePending,
    updateError,
  };
};
