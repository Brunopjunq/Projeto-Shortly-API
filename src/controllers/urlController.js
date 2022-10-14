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

export async function getUrl(req,res) {
    const {id} = req.params

    try {
        const url = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id]);

        if(url.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(url.rows[0]);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}

export async function openUrl(req,res) {
    const {shortUrl} = req.params;

    try {
        const url = await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);

        if(url.rowCount === 0) {
            return res.sendStatus(404);
        }

        await connection.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1`,[shortUrl]);
        res.redirect(url.rows[0].url);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req,res) {
    const { id } = req.params;

    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);

        if(user.rowCount === 0) {
            return res.sendStatus(404);
        }

        const { userId } = user.rows[0];

        const userUrl = await connection.query(`SELECT * FROM urls WHERE id=$1 AND "userId"=$2`,[id,userId]);

        if(userUrl.rowCount === 0) {
            return res.sendStatus(401);
        }

        await connection.query(`DELETE FROM urls WHERE id=$1`, [id]);

        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}