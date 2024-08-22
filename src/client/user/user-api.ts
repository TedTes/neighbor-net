import { logger } from "../../utils/logger";
import axios from "axios";
import { User, Credential, Params, ApiResponse } from "../interfaces";
const createUser = async (user: User): Promise<ApiResponse | undefined> => {
  try {
    let response = await axios.post("/api/v1/users/", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 3000,
    });

    return await response.data;
  } catch (err: unknown) {
    logger.error(
      JSON.stringify({
        error: err,
        method: "createUser",
      })
    );
    return undefined;
  }
};

const listUsers = async (signal: AbortSignal): Promise<User[]> => {
  try {
    let response = await axios.get("/api/v1/users/", {
      signal: signal,
      timeout: 3000,
    });
    return await response.data;
  } catch (err: unknown) {
    logger.error(
      JSON.stringify({
        error: err,
        method: "listUsers",
      })
    );
    return [];
  }
};

const fetchUser = async (
  params: Params,
  credentials: Credential,
  signal: AbortSignal
): Promise<ApiResponse | []> => {
  try {
    let response = await axios.get("/api/v1/users/" + params.userId, {
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.auth_token,
      },
    });
    return await response.data;
  } catch (err: unknown) {
    logger.error(
      JSON.stringify({
        error: err,
        method: "fetchUser",
      })
    );
    return [];
  }
};

const updateUser = async (
  params: Params,
  credentials: Credential,
  user: User
): Promise<ApiResponse | undefined> => {
  try {
    let response = await axios.put("/api/v1/users/" + params.userId, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.auth_token,
      },
      timeout: 3000,
    });
    return await response.data;
  } catch (err) {
    logger.error({
      error: err,
      method: "updateUser",
    });
    return undefined;
  }
};

const deleteUser = async (
  params: Params,
  credentials: Credential
): Promise<ApiResponse | undefined> => {
  try {
    let response = await fetch("/api/v1/users/" + params.userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.auth_token,
      },
    });
    return await response.json();
  } catch (err: unknown) {
    logger.error({
      error: err,
      method: "deleteUser",
    });
    return undefined;
  }
};

export { createUser, listUsers, fetchUser, updateUser, deleteUser };
