import React from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import ShowCrimes from "./ShowCrimes";

function Map() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(
      "https://openapi.izmir.bel.tr/api/ibb/cbs/muhtarliklar"
    ).then((res) => res.json())
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <MapContainer center={[40.8853665241692, 29.357362144397193]} zoom={11}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ShowCrimes data={data} />
    </MapContainer>
  );
}

export default Map;
