import React from "react";
import styles from "./MapBarTools.module.scss";
import { useMapContext } from "../context/MapContext";
const MapBarTools: React.FC = () => {
  const { mapControls } = useMapContext();

  const handleZoomIn = () => {
    mapControls.zoomControl?.zoomIn();
  };

  const handleZoomOut = () => {
    mapControls.zoomControl?.zoomOut();
  };

  return (
    <div className={styles.containerStyles}>
      <button onClick={handleZoomIn} className={styles.zoomButton}>
        Zoom In
      </button>
      <button onClick={handleZoomOut} className={styles.zoomButton}>
        Zoom Out
      </button>
    </div>
  );
};

export default MapBarTools;
