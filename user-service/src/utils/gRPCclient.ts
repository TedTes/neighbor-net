import * as grpc from "@grpc/grpc-js";
import { packageDefinition } from "../../../common/gRPC";
import { config } from "../config";
const { gRPCHostServer, gRPCHostPort } = config;
const authPackage = grpc.loadPackageDefinition(packageDefinition) as any;
export const client = new authPackage.auth.AuthService(
  `${gRPCHostServer}:${gRPCHostPort}`,
  grpc.credentials.createInsecure()
);
