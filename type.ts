export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
};
export type UserData = {
  name: string | null;
  email: string | null;
};

export type GoogleCredential = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export type UserCredential = {
  token: string;
  user: UserData;
};

export type AuthContextType = {
  authState: UserCredential;
  setUserAuthInfo: (data: UserCredential) => void;
  isUserAuthenticated: () => boolean;
};
