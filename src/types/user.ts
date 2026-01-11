export interface User {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  picture: { large: string; medium: string; thumbnail: string };
  gender: string;
}

export interface UserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
