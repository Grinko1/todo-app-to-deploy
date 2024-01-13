export type Status = "completed" | "inprogress" | "new";

export interface Todo {
  _id: string;
  title: string;
  text: string;
  status: Status;
  completed: boolean;
}
