import axios from "axios";
import { logger } from "../utils";
export class UserService {
  static async fetchUsersFromUserService(userIds: string[]) {
    try {
      const response = await axios.post("http://userservice/api/v1/users", {
        userIds,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error({
          methodName: "fetchUsersFromUserService",
          errorDescription: error.message,
          errorStack: error.stack,
        });
      }

      throw new Error("Failed to fetch users");
    }
  }
}
