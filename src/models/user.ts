// const users = [
//   {
//     id: 1,
//     username: "user1",
//     password: "1234566789",
//     email: "user1@gmail.com",
//     refreshToken: "",
//   },
//   {
//     id: 2,
//     username: "user2",
//     password: "987654321",
//     email: "user2@gmail.com",
//     refreshToken: "",
//   },
// ];

// export default users;

import { ISignup } from "../interface/user";
import BaseModel from "./baseModel";

export default class UserModel extends BaseModel {
  
  static async getUserByUsername(username: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ username })
      .first();

    return user;
  }

  static async getUserById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ id })
      .first();
  }

  static async createUser(user: ISignup) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async updateUser(id: number, user: ISignup) {
    return this.queryBuilder().update(user).table("users").where({ id });
  }

  static async deleteUser(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}
