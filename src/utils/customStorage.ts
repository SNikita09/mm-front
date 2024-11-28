import localforage from "localforage";
import {
  ReadUserSettingDto,
  SettingType,
  UserSettingsRepository,
} from "../repo/settings.repo";

const STORAGE_KEY = "userSettings";
const DELAY_MS = 10000;

type StoredSettings = {
  updated_at: string;
  data: {
    [settingType: string]: object;
  };
};

let saveTimeout: NodeJS.Timeout | null = null;

const getCurrentTime = () => new Date().toISOString();

// --- Helper read from localforage ---
const fetchFromLocalStorage = async (
  settingType: SettingType
): Promise<object | null> => {
  const storedSettings = await localforage.getItem<StoredSettings>(STORAGE_KEY);
  return storedSettings?.data?.[settingType] ?? null;
};

// --- Helper read from server ---
const fetchFromBackend = async (
  settingType: SettingType
): Promise<object | null> => {
  const userSettingsArray = await UserSettingsRepository.read();
  const userSetting = userSettingsArray.find(
    (setting) => setting.settingType === settingType
  );

  if (userSetting) {
    const data = userSetting.data as StoredSettings;

    return data || null;
  }

  return null;
};

// --- Helper for update localforage ---
const updateLocalStorage = async (
  settingType: SettingType,
  data: object,
  currentTime: string
) => {
  const storedSettings = (await localforage.getItem<StoredSettings>(
    STORAGE_KEY
  )) || {
    data: {},
    updated_at: currentTime,
  };

  const updatedStoredSettings: StoredSettings = {
    data: {
      ...storedSettings.data,
      [settingType]: data,
    },
    updated_at: currentTime,
  };
  await localforage.setItem(STORAGE_KEY, updatedStoredSettings);
  console.log("Settings saved in localforage with timestamp", currentTime);
};

// --- Helper for delay update data on server---
const scheduleSaveToBackend = async (
  settingType: SettingType,
  data: object,
  currentTime: string
) => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(async () => {
    try {
      await saveSettingsToBackend(settingType, data, currentTime);
    } catch (error) {
      console.error("Error saving settings to backend", error);
    }
  }, DELAY_MS);
};

// --- Helper for saving data on server ---
const saveSettingsToBackend = async (
  settingType: SettingType,
  data: object,
  currentTime: string
) => {
  const userSettingsArray = await UserSettingsRepository.read();
  let existingSetting = userSettingsArray.find(
    (setting) => setting.settingType === settingType
  );

  if (!existingSetting) {
    existingSetting = {
      settingType,
      data: {},
      updated_at: currentTime,
    } as unknown as ReadUserSettingDto;
  }

  const updatedSettings: StoredSettings = {
    updated_at: currentTime,
    data: {
      ...existingSetting.data,
      ...data,
    },
  };
  const createUserSettingDto = {
    settingType,
    data: updatedSettings.data,
    updated_at: currentTime,
  };

  await UserSettingsRepository.create(createUserSettingDto);
  console.log("Settings saved to backend with timestamp", currentTime);
};

export const customStorage = {
  async getStorageData(settingType: SettingType): Promise<object> {
    try {
      // Read from localforage
      const localData = await fetchFromLocalStorage(settingType);
      if (localData) {
        return localData;
      }

      //If localforage has no data, get from server
      const backendData = await fetchFromBackend(settingType);
      if (backendData) {
        await updateLocalStorage(settingType, backendData, getCurrentTime());
        return backendData;
      }
    } catch (error) {
      console.warn("Error fetching from backend or localforage", error);
    }

    return {};
  },

  async setStorageData(settingType: SettingType, data: object) {
    try {
      const currentTime = getCurrentTime();

      // Update data in localforage
      await updateLocalStorage(settingType, data, currentTime);

      // Save on server
      // await scheduleSaveToBackend(settingType, data, currentTime);
    } catch (error) {
      console.error("Error saving data to localforage or backend", error);
    }
  },
};
