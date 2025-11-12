import { BaseModel } from "./base.js";

class UserModel extends BaseModel {
    tableName="users"
}

export const userModel=new UserModel()