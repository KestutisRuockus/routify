import { useState } from "react";
import Map from "../../components/Map";
import SearchInput from "../../components/SearchInput";
import "./home.css";

export type SelectedLocation = {
  coordinates: [number, number];
  name: string;
} | null;

export const Home = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation>(null);
  return (
    <main className="home-main">
      <h1 className="home-title">Find your destination</h1>
      <SearchInput setSelectedLocation={setSelectedLocation} />
      <div className="home-map">
        <Map selectedLocation={selectedLocation} />
      </div>
    </main>
  );
};
