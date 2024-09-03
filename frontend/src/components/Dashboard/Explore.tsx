import React, { useState, useEffect } from "react";
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
      headers: {
        Authorization: environmentVariables.fourSquareAPIkey,
        accept: "application/json",
      },
      params: {
        ll: `${location.lat},${location.lng}`,
        radius: 5000,
        query: category,
        limit: 50,
      },
    });

    setPlaces(response.data.results);
  } catch (error) {
    console.error("Error fetching data from Foursquare API:", error);
  }
  setLoading(false);
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
  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory !== "all") {
        await fetchPlaces(selectedCategory, location, setPlaces, setLoading);
      } else {
        setPlaces([]);
      }
    };

    fetchData();
  }, [selectedCategory, location]);

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
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationHandler
            onLocationChange={(lat, lng) => {
              setLocation({ lat, lng });
            }}
          />
          {places.map((place) => {
            return (
              <React.Fragment key={place.fsq_id}>
                <Marker
                  position={[
                    place.geocodes.main.latitude,
                    place.geocodes.main.longitude,
                  ]}
                >
                  <Popup>
                    <h4>{place.name}</h4>
                    <p>{place.location.formatted_address}</p>
                    <p>{place.categories[0]?.name}</p>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};
