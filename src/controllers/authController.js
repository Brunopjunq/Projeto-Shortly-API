import connection from "../database/db";
import bcrypt from 'bcrypt';

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