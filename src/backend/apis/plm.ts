import express from 'express';

const router = express.Router()
router.use(express.json())


import { 
    getStyles,
    getStyleById,
    getStylePersonByStyleId,
    getPersonById
} from '../gcloud/gcloud-pg.ts';


// api endpoint to get all Styles
router.get('/', async (req:any, res:any) => {
    try {
        const styles = await getStyles();

        console.log(styles);

        res.json(styles);
    } catch (err) {
        console.error(err);
        res.status(500).json({err: `Something went wrong`});
    }
})


// api endpoint to get any Style's attributes by StyleId

router.get('/:id', async (req:any, res:any) => {
    
    const styleId = req.query.attributes;
    console.log(styleId);

    try {
        const style = await getStyleById(styleId);
        console.log(style);
        res.json(style);
    } catch (err) {
        console.error(err);
        res.status(500).json({err: `Something went wrong`});
    }
})

export default router;