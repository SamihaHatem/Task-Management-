import { TaskI } from "./task-i";

export interface TaskResponseI {
    tasks: TaskI[];
    meta: {
        totalCount: number;
        lastUpdated: string;
    };
}
