import connection from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function postUser(req,res) {
    const {name,email,password} = req.body;

    const Hashpassword = bcrypt.hashSync(password, 10);

    try {

        const UserExist = await connection.query(`SELECT * FROM users WHERE email=$1`, [email]);
        if(UserExist.rowCount > 0) {
            return res.sendStatus(409);
        }

        await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name,email,Hashpassword]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function login(req,res) {
    const {email, password} = req.body;

    const { rows: users } = await connection.query(`SELECT * FROM users WHERE email=$1`, [email])
    const [user] = users;
    if(!user) {
        return res.sendStatus(401);
    }

    if(bcrypt.compareSync(password, user.password)) {
        const token = uuid();
        await connection.query(`INSERT INTO sessions (token, "userId") VALUES ($1,$2)`, [token, user.id]);
        return res.send(token);
    }

    res.sendStatus(401);
}