export interface ITodoResponse {
    code:    number;
    path:    string;
    success: boolean;
    ip:      string;
    message: string;
    status:  string;
    array:   boolean;
}

export interface Todo {
    id:          string;
    title:       string;
    description: string;
    done:        boolean;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface IListTodosResponse extends ITodoResponse {
    data: Todo[] | []
}

export interface ICreateTodoResponse extends ITodoResponse {
    data: Todo | null
}

export interface IUpdateTodoResponse extends ITodoResponse {
    data: Todo | null
}

export interface IDeleteTodoResponse extends ITodoResponse {
    data: {
        deleted: boolean
    }
}

export interface IGetTodoResponse extends ITodoResponse {
    data: Todo | null
}

