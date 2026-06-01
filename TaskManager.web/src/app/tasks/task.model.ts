export interface TaskItem{
    id: number
    title: string
    description: string
    assignedTo?: string
    status: TaskItemStatus
    createdAt:string
    dueDate?: string

}

export enum TaskItemStatus{
    Pending = 'Pending',
    InProgress = 'InProgress',
    Done = 'Done'
}

export interface TaskItemRequest{
    title: string
    description: string
    assignedTo?:string
    dueDate?: string
}