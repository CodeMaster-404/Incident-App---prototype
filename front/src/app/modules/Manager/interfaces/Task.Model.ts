import { Incident } from "./Incident.Model";
import { Status } from "./Status.Model";
import { User } from "./User.Model";

export interface Task{
  task_ID: number;
  task_Status: Status;
  incident: Incident;
  technician: User;
}
