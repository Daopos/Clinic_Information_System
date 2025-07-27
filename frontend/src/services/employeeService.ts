import { AxiosError } from "axios";
import type { Employee, EmployeeFormData } from "../types/IEmployee";
import AxiosClientUser from "../axios-client/axios-client";
import type { ApiResponse } from "../types/ApiResponse";

// const getEmployees = async (): Promise<Employee[]> => {

// }

const createEmployee = async (data: EmployeeFormData) => {
  try {
    const result = await AxiosClientUser.post("/user", data);
    return result.data.responseData as Employee;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

const getEmployees = async (): Promise<Employee[]> => {
  const response = await AxiosClientUser.get<ApiResponse<Employee[]>>("/users");

  return response.data.responseData;
};

const deleteEmployee = async (id: number): Promise<number> => {
  await AxiosClientUser.delete(`/user/${id}`);

  return id; // so we know what to filter from cache
};

export default { createEmployee, getEmployees, deleteEmployee };
