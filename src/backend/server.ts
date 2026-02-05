import express from 'express';
import cors from 'cors';
import router from './apis/plm.ts';
import Middleware from '../middleware/index.ts';

const app = express();
const port = 8000;

app.use(cors());

const middleware = new Middleware();
app.use(middleware.decodeToken);

app.use('/apis/plm', router);


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})