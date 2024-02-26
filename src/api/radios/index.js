import { Router } from 'express'
import axios from 'axios'
import * as controller from './radio.controller'
const router = Router()

router.get('/', async (req, res) => {
    res.json(await controller.listRadios())
})
router.get('/:id/capture', (req, res) => {

});
router.get('/:id', controller.returnRadio)

export default router
