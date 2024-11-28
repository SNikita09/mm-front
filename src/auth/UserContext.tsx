import localforage from "localforage";
import { USER_CONTEXT } from "../components/constants/user.constant";

export interface UserContext {
  access_token: string;
  user: {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const _loadUserContext = async (): Promise<UserContext | null> => {
  const stringValue = await localforage.getItem<string>(USER_CONTEXT);
  if (stringValue) {
    return JSON.parse(stringValue) as UserContext;
  }
  return null;
};

export const _saveUserContext = async (userContext: UserContext | null) => {
  if (userContext) {
    await localforage.setItem(USER_CONTEXT, JSON.stringify(userContext));
  } else {
    await localforage.removeItem(USER_CONTEXT);
  }
};
