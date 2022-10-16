import connection from "../database/db.js";

export async function getUserInfo(req,res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {
        const user = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);

        if(user.rowCount === 0) {
            return res.sendStatus(404);
        }

        const {userId} = user.rows[0];

        const usersUrl = await connection.query(`SELECT id,"shortUrl",url,"visitCount" FROM urls WHERE "userId"=$1;`, [userId]);

        const VisitTotal = await connection.query(`SELECT SUM("visitCount") FROM urlS WHERE "userId"=$1;`, [userId]);

        const userData = await connection.query(`SELECT id, name FROM users WHERE id=$1`, [userId]);

        const userInfo = {
            id: userData.rows[0].id,
            name: userData.rows[0].name,
            visitCount: VisitTotal.rows[0].sum,
            shortenedUrls: usersUrl.rows
        }


        res.send(userInfo);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req,res) {
    try {
        const { rows: users } = await connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(urls."userId") AS "linksCount",
            COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
            LEFT JOIN urls ON users.id=urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
    `)

    res.send(users);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}