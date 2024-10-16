import * as grpc from "@grpc/grpc-js";
import { logger } from "../utils";
import { config } from "../config";

const { gRPCHostServer, gRPCHostPort } = config;

export const gRPCserver = new grpc.Server();
gRPCserver.bindAsync(
  `${gRPCHostServer}:${gRPCHostPort}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      logger.error(`Error: ${error}`);
      return;
    }
    logger.info("gRPC server running on port 50051");
    gRPCserver.start();
  }
);
