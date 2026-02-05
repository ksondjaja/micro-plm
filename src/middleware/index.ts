// check if middleware works with blocking incorrect token
// https://www.youtube.com/watch?v=Jfkme6WE_Dk&ab_channel=DailyWebCoding

import admin from '../backend/firebase-auth/firebase-config.ts'

class Middleware{
    async decodeToken(req:any, res:any, next:any){
        
        try{
            const token = req.headers.authorization.split(' ')[1];

            console.log(token);

            const decodeValue = await admin.auth().verifyIdToken(token);
            console.log(decodeValue);

            if(decodeValue){
                return next();
            }

            return res.json({message: 'Unauthorize'})
        }catch(e){
            console.log(e);
            return res.json({message: 'Internal Error'})
        }
    }
}

export default Middleware;