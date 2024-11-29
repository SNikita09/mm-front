import * as ol from "ol";
import Map from "ol/Map";
import * as olControl from "ol/control";
import { Coordinate } from "ol/coordinate";
import { defaults as defaultInteractions } from "ol/interaction";
import "ol/ol.css";
import React, { useEffect, useMemo, useRef } from "react";
import { MapState } from "../../models/Map";
import { useMapContext } from "../context/MapContext";
import styles from "./MapStyles.module.scss";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { useVersionContext } from "../context/VersionContext";

interface MapComponentProps {
  initialState?: MapState;
}

const MapComponent: React.FC<MapComponentProps> = ({ initialState }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { mapControls, setMapControls } = useMapContext();
  const { updateVersion } = useVersionContext();
  const centerCoordinates = [49.8671, 40.4093];
  const center = fromLonLat(centerCoordinates);
  const zoom = 8;

  const controlMousePosition = new olControl.MousePosition({
    className: styles.olsMousePosition,
    coordinateFormat: (coords?: Coordinate) => {
      const x = coords && !isNaN(coords[0]) ? coords[0].toFixed(2) : "-";
      const y = coords && !isNaN(coords[1]) ? coords[1].toFixed(2) : "-";

      return `${x}, ${y}`;
    },
  });
  const mapOptions = useMemo(() => {
    return {
      view: new ol.View({ zoom, center }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      controls: olControl
        .defaults({
          attribution: false,
          zoom: false,
          rotate: false,
        })
        .extend([
          controlMousePosition,
          new olControl.FullScreen({ tipLabel: "Full Screen" }),
        ]),
      interactions: defaultInteractions({
        doubleClickZoom: false,
      }),
    };
  }, [zoom, center]);
  useEffect(() => {
    if (!mapRef.current) return;
    const olMap = new Map(mapOptions);
    olMap.setTarget(mapRef.current);

    updateVersion("Map");
    return () => {
      olMap.setTarget();
    };
  }, [mapRef, mapControls, setMapControls, updateVersion]);

  return <div ref={mapRef} className={styles.olMap} />;
};

export default MapComponent;
