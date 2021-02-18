import { Role } from "./Role.Model";

export interface User{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  //role: Role;
  //roleId: number;
}
