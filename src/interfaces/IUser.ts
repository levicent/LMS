export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phone: Number;
  image: String;
  role: "student" | "teacher" | "admin";
}
