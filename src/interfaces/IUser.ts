export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phone: Number;
  role: "student" | "teacher" | "admin";
}
