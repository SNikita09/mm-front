import { Split, SplitMeasuredSizes } from "@geoffcox/react-splitter";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";

import { customStorage } from "../utils/customStorage";
import styles from "./SplitterLayout.module.scss";
import { SettingType } from "../repo/settings.repo";
import MapComponent from "./map/MapComponent";

type SplitterSizeT = {
  splitterSizeH: number;
  splitterSizeV: number;
};
enum SplitterType {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

const SplitterLayout: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMapComponentLoaded, setIsMapComponentLoaded] =
    useState<boolean>(false);
  const splitterSizesRef = useRef<SplitterSizeT>({
    splitterSizeH: 700,
    splitterSizeV: 400,
  });

  useEffect(() => {
    const loadSplitterSize = async () => {
      try {
        const splitterState = (await customStorage.getStorageData(
          SettingType.TYPE2
        )) as SplitterSizeT;
        if (splitterState) {
          splitterSizesRef.current = splitterState;
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading splitter size", error);
      }
    };
    loadSplitterSize();
  }, []);

  const handleSplitterResize = useCallback(
    async (sizes: SplitMeasuredSizes, type: SplitterType) => {
      const primary = Math.floor(sizes.primary);
      if (primary) {
        const updatedSizes =
          type === "vertical"
            ? { ...splitterSizesRef.current, splitterSizeV: primary }
            : { ...splitterSizesRef.current, splitterSizeH: primary };
        splitterSizesRef.current = updatedSizes;

        try {
          await customStorage.setStorageData(SettingType.TYPE2, updatedSizes);
        } catch (error) {
          console.error("Error saving splitter size", error);
        }
      }
    },
    []
  );

  return (
    <div className={styles.splitterContainer}>
      <Split
        minPrimarySize="200px"
        minSecondarySize="200px"
        initialPrimarySize={`${splitterSizesRef.current.splitterSizeH}px`}
        splitterSize="6px"
        horizontal
        onMeasuredSizesChanged={(sizes) =>
          handleSplitterResize(sizes, SplitterType.HORIZONTAL)
        }
        defaultSplitterColors={{
          color: "#e7edf4",
          hover: "#e7edf4",
          drag: "#e7edf4",
        }}
      >
        <div className={styles.splitterPrimary}>
          <Split
            minPrimarySize="200px"
            minSecondarySize="200px"
            initialPrimarySize={`${splitterSizesRef.current.splitterSizeV}px`}
            splitterSize="6px"
            onMeasuredSizesChanged={(sizes) =>
              handleSplitterResize(sizes, SplitterType.VERTICAL)
            }
            defaultSplitterColors={{
              color: "#e7edf4",
              hover: "#e7edf4",
              drag: "#e7edf4",
            }}
          >
            <div className={styles.splitterMap}>
              <MemoizedMapComponent
                onLoad={() => setIsMapComponentLoaded(true)}
              />
            </div>
            {isMapComponentLoaded && (
              <div className={styles.splitterRightPanel}>
                <h2>Right Panel</h2>
                <p>This is the right panel content.</p>
              </div>
            )}
          </Split>
        </div>
        <div className={styles.splitterBottomPanel}>
          <h2>Bottom Panel</h2>
          <p>This is the bottom panel content.</p>
        </div>
      </Split>
    </div>
  );
};

const MemoizedMapComponent = memo(({ onLoad }: { onLoad: () => void }) => {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return <MapComponent />;
});

export default SplitterLayout;
