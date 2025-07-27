import { useQuery } from "@tanstack/react-query";
import type { Employee } from "../types/IEmployee";
import employeeService from "../services/employeeService";

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: employeeService.getEmployees,
  });
};
