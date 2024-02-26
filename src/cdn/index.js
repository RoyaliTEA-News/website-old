import express from 'express';
import fs from 'fs';
import mime from 'mime';
const router = express.Router();

router.get('/', (req, res) => res.redirect('/404'));
router.get('/*', (req, res) => {
    const path = `${__dirname}/files${req.path}`;
    if (fs.existsSync(path)) {
        const type = mime.getType(path);
        res.setHeader('Content-Type', type);
        res.send(fs.readFileSync(path));
    } else {
        res.redirect('/404');
    };
});

export default router;