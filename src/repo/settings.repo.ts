import axiosInstance from "../components/common/axiosInstance";

export enum SettingType {
  TYPE1 = 1, //Map panel
  TYPE2 = 2, //Splitter
  TYPE3 = 3, //Positions
}

export type CreateUserSettingDto = {
  settingType: SettingType;
  data: object;
};
export type ReadUserSettingDto = {
  id: string;
  userId: string;
  updated_at: Date;
  settingType: SettingType;
  data: object;
};

export class UserSettingsRepositoryImpl {
  read = async (): Promise<ReadUserSettingDto[]> => {
    const response =
      await axiosInstance.get<ReadUserSettingDto[]>("/user-settings");
    return response.data;
  };
  create = async (createDto: CreateUserSettingDto) => {
    const response = await axiosInstance.post<ReadUserSettingDto>(
      "/user-settings",
      createDto
    );
    return response.data;
  };
}

export const UserSettingsRepository: UserSettingsRepositoryImpl =
  new UserSettingsRepositoryImpl();
