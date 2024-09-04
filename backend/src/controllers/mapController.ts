import { Request, Response, NextFunction, RequestHandler } from "express";
import { envVariables } from "../config";
import axios from "axios";
import { Place } from "../interfaces";
export const mapController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void | string> => {
  console.log("req");
  console.log(req);
  const url = envVariables.fourSquareAPI;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: envVariables.fourSquareAPIkey,
        accept: "application/json",
      },
      params: {
        ll: `${req.params.lat},${req.params.lng}`,
        radius: 5000,
        query: req.params.query,
        limit: 50,
      },
    });
    const placesWithData = response.data.results;
    const placesWithDetails = await Promise.all(
      placesWithData.map(async (place: Place) => {
        const details = await fetchVenueDetails(place.fsq_id);
        return { ...place, details };
      })
    );
    res.json(placesWithDetails);
  } catch (error) {
    return JSON.stringify(error);
  }
};
const fetchVenueDetails = async (fsq_id: string) => {
  try {
    const response = await axios.get(
      `${envVariables.fourSquareAPI}/${fsq_id}`,
      {
        headers: {
          Authorization: envVariables.fourSquareAPIkey,
          accept: "application/json",
        },
      }
    );
    console.log("heyyyy");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching venue details:", error);
    return null;
  }
};
