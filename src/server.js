import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/index.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get('/status', (req,res) => {
    res.send('ok');
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});