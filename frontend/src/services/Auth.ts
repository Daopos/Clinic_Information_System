import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type { IUserLogin, IUserResponse } from "../types/IUser";

export const authLogin = async (data: IUserLogin): Promise<IUserResponse> => {
  try {
    const result = await AxiosClientUser.post("/login", data);
    return result.data.responseData as IUserResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const me = async (): Promise<IUserResponse> => {
  try {
    const result = await AxiosClientUser.get("/me");
    return result.data.responseData as IUserResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};
