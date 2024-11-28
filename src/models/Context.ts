import { BBox, MapControl } from "./Common";

export type MapControls = Record<string, MapControl>;

export interface MapControlContextType {
  mapControls: MapControls;
  setMapControls: (mapControls: MapControls) => void;
}

//

export type MapBBoxes = Record<string, BBox>;

export interface MapBBoxContextType {
  mapBBoxes: MapBBoxes;
  setMapBBoxes: (mapBBoxes: MapBBoxes) => void;
}

//

export interface MapControlHelper {
  setExtent: (bbox: BBox, timeout?: number) => Promise<void>;
}

//

export type EntityName = "Map" | "Layer" | "ScaleLevel"; // etc

export type EntityVersionType = Date | number | string;

export type EntityVersions = Record<EntityName, EntityVersionType>;

export type EntityVersionContextType = {
  versions: EntityVersions;
  updateVersion: (entity: EntityName, version?: EntityVersionType) => void;
};

// example of EntityVersionContext

// const EntityVersionContext = createContext<EntityVersionContextType | null>(null);

// export const EntityVersionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [versions, setVersions] = useState<EntityVersions>({});

//     const updateVersion = useCallback((entity: EntityName) => {
//         setVersions((prev) => ({
//             ...prev,
//             [entity]: new Date(),
//         }));
//     }, []);

//     return (
//         <EntityVersionContext.Provider value= {{ versions, updateVersion }
// }>
//     { children }
//     </EntityVersionContext.Provider>
//     );
//   };

// export const useEntityVersions = () => {
//     const context = useContext(EntityVersionContext);
//     if (!context) {
//         throw new Error('useEntityVersions must be used within an EntityVersionProvider');
//     }
//     return context;
// };

// export const useEntityVersion = (entity: EntityName): EntityVersionType | undefined => {
//     const { versions } = useEntityVersions();
//     return useMemo(() => versions[entity], [versions, entity]);
// };

// const MapComponent: React.FC = () => {
//     const mapVersion = useEntityVersion('Map');

//     return (
//         <div>
//         <p>Map Component </p>
//             < p > Version: { mapVersion ? mapVersion : 'New' } </p>
//                 </div>
//     );
//   };
