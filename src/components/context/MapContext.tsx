import React, { createContext, useContext, useState } from "react";
import { MapControls } from "../../models/Context";

interface MapContextType {
  mapControls: MapControls;
  setMapControls: (mapControls: MapControls) => void;
}

const MapContext = createContext<MapContextType | null>(null);

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [mapControls, setMapControls] = useState<MapControls>({});

  return (
    <MapContext.Provider value={{ mapControls, setMapControls }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
