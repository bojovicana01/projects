import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import universalRouter from './routers/universal.router';
import ucenikRouter from './routers/ucenik.router';
import bodyParser from 'body-parser';
import nastavnikRouter from './routers/nastavnik.router';


const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '4mb'}));
//app.use(express.json());

// konekcija sa bazom
mongoose.connect('mongodb://127.0.0.1:27017/projekatPIA1');
const conn = mongoose.connection;
conn.once("open", () => {
    console.log("DB ok")
})

// postavka rutera
const router = express.Router();
router.use('/universal', universalRouter);
router.use('/ucenik', ucenikRouter);
router.use('/nastavnik', nastavnikRouter);


app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));