import { AxiosError } from "axios";
import AxiosClientUser from "../axios-client/axios-client";
import type { IUserLogin, IUserResponse } from "../types/IUser";
import type { MyProfile } from "../types/IProfile";

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

export const logout = async (): Promise<void> => {
  try {
    await AxiosClientUser.post("/logout");
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const myProfile = async (): Promise<MyProfile> => {
  try {
    const response = await AxiosClientUser.get("/my-profile");

    return response.data.responseData;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const sendChangePasswordLink = async (email: string): Promise<void> => {
  try {
    await AxiosClientUser.post("/changeLink", { email });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "please try again later";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const changePassword = async (
  token: string,
  password: string
): Promise<void> => {
  try {
    await AxiosClientUser.post("/change/password", { token, password });
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "please try again later";
      throw new Error(errorMessage);
    }
    throw new Error("An unknown error occurred during login");
  }
};
