import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button, ButtonGroup, CircularProgress, Box } from "@mui/material";

const FOURSQUARE_API_KEY = "fsq3+ijvLDSbYCp31787bsZPoRf8SsgTSyRwrr5EgTe+w18=";

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
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      "https://api.foursquare.com/v3/places/search",
      {
        headers: {
          Authorization: `Bearer ${FOURSQUARE_API_KEY}`,
        },
        params: {
          ll: "51.505,-0.09",
          radius: 5000,
          query: category,
          limit: 10,
        },
      }
    );
    setPlaces(response.data.results);
  } catch (error) {
    console.error("Error fetching data from Foursquare API:", error);
  }
  setLoading(false);
};

export const Explore = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory !== "all") {
        await fetchPlaces(selectedCategory, setPlaces, setLoading);
      } else {
        setPlaces([]);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      // sx={{
      //   height: "100vh",
      //   width: "100%",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      className="explore"
    >
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {places.map((place) => (
            <Marker
              key={place.fsq_id}
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
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};
