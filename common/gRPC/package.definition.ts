import * as protoLoader from "@grpc/proto-loader";
import path from "path";
export const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./auth.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
