import { TaskStatus, TaskPriority } from "./task-i";

export interface TaskFilterI {
    search: string;
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    assigneeId: string | 'all';
}