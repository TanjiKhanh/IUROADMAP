export interface IUser {
  id: string;
  email: string;
  name?: string | null;
  roleId: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRole {
  id: string;
  name: string;
  description?: string | null;
}

export interface IPermission {
  id: string;
  name: string;
  description?: string | null;
}
