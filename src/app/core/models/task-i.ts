import { AssigneeI } from './assignee-i';

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskI {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  isOverdue: boolean;
  completedAt: string;
  assignee: AssigneeI;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponseI {
  tasks: TaskI[];
  meta: {
    totalCount: number;
    lastUpdated: string;
  };
}
