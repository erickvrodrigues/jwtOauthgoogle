import { Router } from 'express';
import { requestLogin } from '../Models/usuariosModel';
import verifyToken from '../../middleware/usuariosMiddleware';
import {generateQrcode, verifyAuthToken} from '../../middleware/autheticatorGoogle' ;

import { getAll, criarUser, deleteUser } from '../Controllers/usuarioController';

const routes = new Router();

routes.get('/', ( req, res ) => {
  res.status(200).json({ ok: 'conected' });
});

routes.get('/qrcode',generateQrcode);
routes.get('/usuarios', verifyToken, getAll);
routes.post('/usuarios', criarUser);
routes.delete('/usuarios/:id', verifyToken, deleteUser);
routes.get('/login', verifyAuthToken, requestLogin);

export default routes;
