export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
