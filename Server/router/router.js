import { Router } from "express";
import { createUrl, redirectUrl } from "../controllers/controller.js";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Server is running!');
})
router.post('/shorten', createUrl);   
router.get('/:code', redirectUrl);  

export default router;
