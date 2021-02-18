import { Status } from "./Status.Model";
import { User } from "./User.Model";

export interface Incident{
  id: number;
  location: string;
  description: string;
  date_Logged: Date;
  status: Status;
  user: User;
  technicianId: number;
  technician: User;
}

