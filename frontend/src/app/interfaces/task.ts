import { UserInterface } from "./user";
import { TagInterface } from "./tag";

export interface TaskInterface {
    id?: number;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate?: Date;

  tagIds?: number[];
  tags?: TagInterface[];

  userId: number;
  user?: UserInterface;
}
