import { User } from "./User.Model";

export interface Report{
  report_ID: number;
  report_Request: User;
  report_Description: string;
}
