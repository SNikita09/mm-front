import React, { createContext, useContext, useState, useCallback } from "react";
import { EntityVersions, MapControls } from "../../models/Context";

interface MapContextType {
  versions: EntityVersions;
  updateVersion: (entity: string) => void;
  mapControls: MapControls;
  setMapControls: (mapControls: MapControls) => void;
}

const MapContext = createContext<MapContextType | null>(null);

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [versions, setVersions] = useState<EntityVersions>(
    {} as EntityVersions
  );
  const [mapControls, setMapControls] = useState<MapControls>({});

  const updateVersion = useCallback((entity: string) => {
    setVersions((prev) => ({
      ...prev,
      [entity]: new Date(),
    }));
  }, []);

  return (
    <MapContext.Provider
      value={{ versions, updateVersion, mapControls, setMapControls }}
    >
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
