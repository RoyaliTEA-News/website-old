import { Router } from 'express';
import PageRouter from './PageRouter.js';
import ejs from 'ejs';
import fs from 'fs';

const router = Router()

router.use('/', async (req, res) => {
  const data = ejs.render(fs.readFileSync(`${__dirname}/versions/one.ejs`, 'utf8'), {
    ...await PageRouter.getPage(req.path)
  });
  res.send(data);
})

export default router