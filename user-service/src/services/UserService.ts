import { User } from "../models/UserModel";
import { s3Service } from "../services/S3Service"; // A service to handle file uploads
import { client, logger } from "../utils";

class UserService {
  async createUser(userData: any) {
    try {
      const { username, email, profilePhotoUrl, password } = userData;
      const newUser = await User.create({ username, email, profilePhotoUrl });

      client.RegisterUser(
        { username, email, password },
        (error: any, response: any) => {
          if (error) {
            logger.error(error);
          } else {
            logger.log("User registered:", response);
          }
        }
      );
      return newUser;
    } catch (error) {
      throw {
        methodName: "UserService.createuser",
        message: error,
      };
    }
  }

  async updateProfilePhoto(userId: number, file: any) {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");
      const photoUrl = await s3Service.upload(file);

      user.profilePhotoUrl = photoUrl;
      await user.save();

      return user;
    } catch (error) {
      throw {
        methodName: "UserService.updateProfilePhoto",
        message: error,
      };
    }
  }
}

export const userService = new UserService();
