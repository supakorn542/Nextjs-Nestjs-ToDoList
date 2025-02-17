export class CreateTaskDto {
    readonly title: string;
    readonly description?: string;
    readonly status: 'To Do' | 'In Progress' | 'Completed';
    readonly dueDate?: Date;  
    readonly userId: number;
    readonly tagIds?: number[];
}
