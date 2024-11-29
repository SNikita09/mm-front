import React from "react";
import { MapProvider } from "./context/MapContext";
import { VersionProvider } from "./context/VersionContext";

interface GeoHOCProps {
  children: React.ReactNode;
}

const GeoHOC: React.FC<GeoHOCProps> = ({ children }) => {
  return (
    <VersionProvider>
      <MapProvider>{children}</MapProvider>
    </VersionProvider>
  );
};

export default GeoHOC;
