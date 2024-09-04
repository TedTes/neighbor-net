import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button, ButtonGroup, CircularProgress, Box } from "@mui/material";
import "../../utils/index";
import { environmentVariables } from "../../config/index";

interface MapComponentProps {
  onLocationChange: (lat: number, lng: number) => void;
}
interface Place {
  fsq_id: string;
  name: string;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  categories: { name: string }[];
  location: {
    formatted_address: string;
  };
  website: string;
}

const fetchPlaces = async (
  category: string,
  location: { lat: number; lng: number },
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await axios.get(environmentVariables.fourSquareAPI, {
      params: {
        ll: `${location.lat},${location.lng}`,
        query: category,
      },
    });
    const placesWithData = response.data;

    setPlaces(placesWithData);
  } catch (error) {
    console.error("Error fetching data from Foursquare API:", error);
  } finally {
    setLoading(false);
  }
};
const LocationHandler: React.FC<MapComponentProps> = ({ onLocationChange }) => {
  useMapEvents({
    moveend: (event: L.LeafletEvent) => {
      const map = event.target as L.Map;
      const center = map.getCenter();
      onLocationChange(center.lat, center.lng);
    },
  });

  return null;
};

export const Explore = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });

  const fetchData = useCallback(async () => {
    if (selectedCategory !== "all") {
      await fetchPlaces(selectedCategory, location, setPlaces, setLoading);
    } else {
      setPlaces([]);
    }
  }, [selectedCategory, location]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box className="explore">
      <ButtonGroup
        variant="contained"
        sx={{
          position: "absolute",

          zIndex: 100000,
          top: "4em",
        }}
      >
        <Button onClick={() => handleCategoryChange("restaurant")}>
          Restaurants
        </Button>
        <Button onClick={() => handleCategoryChange("event")}>Events</Button>
        <Button onClick={() => handleCategoryChange("shop")}>Shops</Button>
        <Button onClick={() => handleCategoryChange("park")}>Parks</Button>
      </ButtonGroup>

      {loading && <CircularProgress color="primary" />}

      <Box sx={{ height: "80%", width: "100%" }}>
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationHandler
            onLocationChange={(lat, lng) => {
              setLocation({ lat, lng });
            }}
          />
          {places.map(
            ({ fsq_id, geocodes, name, location, categories, website }) => {
              return (
                <React.Fragment key={fsq_id}>
                  <Marker
                    position={[geocodes.main.latitude, geocodes.main.longitude]}
                  >
                    <Popup>
                      <h4>{name}</h4>
                      <p>{location.formatted_address}</p>
                      <p>{categories[0]?.name}</p>
                      {website ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={website}
                        >
                          Link to website
                        </a>
                      ) : (
                        ""
                      )}
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            }
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};
