export interface User {
  _id?: String;
  name?: String;
  email?: String;
  username?: String;
  password?: String;
  profilePicture?: any;
}

export interface RegisterUserResponse {
  success: Boolean;
  msg: String;
  id: String;
}

export interface LoginResponse {
  success: Boolean;
  msg?: String;
  token?: String;
  user?: User;
}

export interface ProfileResponse {
  user: {
    _id: String;
    username: String;
    name: String;
    email: String;
    password: String;
    profilePicture: any;
  };
}
