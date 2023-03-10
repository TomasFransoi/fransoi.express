const { Router } = require('express');
import { Socket } from 'socket.io';

const router = Router();

router.post('/', (req, res) => {
  socket.emit('newClient', req.body.user)
  res.json({ message: `New User: ${req.body.user}` })
})
router.get('/', (req, res) => {
    res.render('index.handlebars', {})
  })

export default router