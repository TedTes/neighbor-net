import { User } from "../models/UserModel";
import { s3Service } from "../services/S3Service"; // A service to handle file uploads
import axios from "axios";

class UserService {
  async createUser(userData: any) {
    try {
      const { username, email, profilePhotoUrl, password } = userData;
      const newUser = await User.create({ username, email, profilePhotoUrl });
      //TODO:
      await axios.post("http://auth-service/v1/auth/register", {
        email,
        password,
        username,
      });
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
