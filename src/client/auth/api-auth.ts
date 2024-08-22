import { ApiResponse, User } from "../interfaces";
import axios from "axios";
import { logger } from "../../utils/logger";
const signIn = async (user: User): Promise<ApiResponse | undefined> => {
  try {
    let response = await axios.post("/auth/v1/signin/", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.data;
  } catch (err: unknown) {
    logger.error(
      JSON.stringify({
        method: "signin",
        error: err,
      })
    );
    return undefined;
  }
};
const signOut = async (): Promise<ApiResponse | undefined> => {
  try {
    let response = await axios.get("/auth/v1/signout/");
    return await response.data;
  } catch (err: unknown) {
    logger.error(
      JSON.stringify({
        method: "signout",
        error: err,
      })
    );
    return undefined;
  }
};

export { signIn, signOut };
