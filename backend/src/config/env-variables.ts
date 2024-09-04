export const envVariables = {
  env: process.env.NODE_ENV || "development",
  fourSquareAPI:
    process.env.FOUR_SQUARE_API || "https://api.foursquare.com/v3/places",
  fourSquareAPIkey:
    process.env.FOUR_SQUARE_API_KEY ||
    "fsq3s3Hl+Fe49ISDpj32jM9isqhz8hfbohZ5I/HcKyza3Y8=",
};
