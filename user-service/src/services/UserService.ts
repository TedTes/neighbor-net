import { User } from "../models/UserModel";
import { s3Service } from "../services/S3Service"; // A service to handle file uploads

class UserService {
  async createUser(userData: any) {
    try {
      const user = await User.create(userData);
      return user;
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

      // Upload the file to the storage service
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
