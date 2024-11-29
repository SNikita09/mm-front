import React, { createContext, useContext, useState, useCallback } from "react";
import { EntityVersions } from "../../models/Context";

interface VersionContextType {
  versions: EntityVersions;
  updateVersion: (entity: string) => void;
}

const VersionContext = createContext<VersionContextType | null>(null);

interface VersionProviderProps {
  children: React.ReactNode;
}

export const VersionProvider: React.FC<VersionProviderProps> = ({
  children,
}) => {
  const [versions, setVersions] = useState<EntityVersions>(
    {} as EntityVersions
  );

  const updateVersion = useCallback((entity: string) => {
    setVersions((prev) => ({
      ...prev,
      [entity]: new Date(),
    }));
  }, []);

  return (
    <VersionContext.Provider value={{ versions, updateVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersionContext = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersionContext must be used within a VersionProvider");
  }
  return context;
};
