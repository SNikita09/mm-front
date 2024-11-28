import React from "react";
import { MapProvider } from "../components/map/MapContext";

interface GeoHOCProps {
  children: React.ReactNode;
}

const GeoHOC: React.FC<GeoHOCProps> = ({ children }) => {
  return <MapProvider>{children}</MapProvider>;
};

export default GeoHOC;
