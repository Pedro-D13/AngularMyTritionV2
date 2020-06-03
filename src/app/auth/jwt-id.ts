export interface JWTID {
  token: string;
  user: {
    pk: number;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}
