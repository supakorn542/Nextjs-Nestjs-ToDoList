import { UserInterface } from "./user";
import { TaskInterface } from "./task";

export interface TagInterface {
    id?: number;       
    name: string;

    userId: number; 
    user: UserInterface;
          
    taskIds?: number[];  
    tasks? : TaskInterface[] ;
  }