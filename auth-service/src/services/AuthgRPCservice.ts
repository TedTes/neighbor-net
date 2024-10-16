import { logger } from "../utils";
import * as grpc from "@grpc/grpc-js";
import * as bcrypt from "bcrypt";
import { User } from "../models";
import { packageDefinition } from "@common/grpc";
import { gRPCserver } from "../utils";

const authPackage = grpc.loadPackageDefinition(packageDefinition) as any;
const AuthService = authPackage.auth.AuthService;

gRPCserver.addService(AuthService.service, {
  registerUser: async (call: any, callback: any) => {
    try {
      const { username, email, password } = call.request;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return callback(null, {
          success: false,
          message: "User with this email already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        username,
      });
      callback(null, {
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      logger.error("Error registering user:", error);
      callback(
        {
          code: grpc.status.INTERNAL,
          message: "Failed to register user",
        },
        null
      );
    }
  },
});
