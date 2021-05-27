export interface Id {
  _id: string;
}

export interface ResponseStatusCodeMsg {
  statusCode: number;
  message: string;
  data: object | any;
}

export interface Meta {
  title?: string;
  des?: string;
  img?: string;
  key?: string;
}

