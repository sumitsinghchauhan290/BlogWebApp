export interface Blog {
    id: number;
    username: string;
    dateCreated: Date;
    text: string;
    isNew?: boolean;
  }

  export interface BlogForApi{
    id: number;
    username: string;
    dateCreated: Date;
    text: string;
  }