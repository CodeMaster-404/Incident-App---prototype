import { Incident } from './incident.model';
import { User } from './user.model';

export interface TaskDetail {
    id: number;
    task_status: number;
    task_reason: string;
    incident: Incident;
    technician: User;
}