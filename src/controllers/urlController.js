import connection from "../database/db.js";
import {nanoid} from 'nanoid';


export async function postUrl(req,res) {
    const {url} = req.body;

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {

        const user = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);

        if(user.rowCount === 0) {
            return res.sendStatus(404);
        }

        const { userId } = user.rows[0];
        const shortUrl = nanoid(8);

        await connection.query(`INSERT INTO urls ("shortUrl", url, "userId") VALUES ($1,$2,$3)`, [shortUrl, url, userId]);
        
        res.status(201).send(shortUrl);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}