const express = require('express');
const cors = require('cors');
const middleware = require('../middleware');
const router = require('./apis/plm')


const app = express();
const port = 8000;

app.use(cors());

app.use(middleware.decodeToken);

app.use('/api/plm', router);


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})