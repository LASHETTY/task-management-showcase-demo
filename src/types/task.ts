
export type TaskStatus = "pending" | "in-progress" | "completed" | "cancelled";

export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  remarks: string;
  createdOn: string;
  lastUpdatedOn: string;
  createdBy: User;
  lastUpdatedBy: User;
}
