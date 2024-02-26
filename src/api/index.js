import { Router } from 'express'
import radioRouter from './radios'
import pageRouter from '../web/PageRouter.js'

const router = Router()

router.use('/radios', radioRouter)
router.use('/pagerouter', async (req, res) => {
  const { page: pagename } = req.query;
  if (!pagename) return res.status(400).json({
    status: 'error',
    error: {
      code: 400,
      message: 'Page not found',
      full: 'Query "page" was required but not found.'
    }
  });
  let data = await pageRouter.getPage(pagename);
  res.json({
    status: 'success',
    ...data
  });
});
router.use('/', (req, res) => {
  res.send('test')
})

export default router
