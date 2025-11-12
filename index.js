import express from "express";
import { pool } from "./config/db.js"
import dotenv from "dotenv"
import { userModel } from "./models/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4008;

app.use(express.json());
app.use(express.urlencoded());


app.get("/users", async (req, res) => {
    // const users = await userModel.find().where("age", 20).build() //select * from users where age=20
    // const users = await userModel.find("name", "surname", "age").where("age", 20).build() //select name, surname, age from users where age=20
    // const users = await userModel.find().where("age", 20).orWhere("age", 40).build() //select * from users where age=20 or age = 40
    // const users = await userModel.find().where("age", 20).limit(2).build() //select * from users where age=20 limit 2
    // const users = await userModel.find().orderBy("age").limit(2).build() //select * from users order by age limit 2
    // const users = await userModel.insert({ name: "Tiko", age: 20 }) //INSERT INTO users(name, age) VALUES('Tiko', 20)
    // const users = await userModel.deleteById(42) //DELETE FROM users where id = 42
    // const users = await userModel.set("salary", 200000).set("type", "admin").where({ age: 20, name: "Tiko" })
    //update users set salary = 200000, type = "admin" where age = 20 and name = 'Tiko'

    if (users.error) {
        return res.status(404).send({ error: users.error });
    }
    res.status(200).send({ users: users })
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});