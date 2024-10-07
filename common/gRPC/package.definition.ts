import * as protoLoader from "@grpc/proto-loader";
export const packageDefinition = protoLoader.loadSync("auth.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
