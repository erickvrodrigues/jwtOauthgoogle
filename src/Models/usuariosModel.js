import connection from './mongoConnection';

import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const SECRET = 'kimviana';

const getAll = async () => {
  const db = await connection();
  const usuarios = db.collection('usuarios').find().toArray();
  return usuarios;
};

const newUsers = async ({ email, senha }) => {
  const db = await connection();
  const user = await db.collection('usuarios').insertOne({ email, senha });
  const { insertedId: id } = user;
  return { email, _id: id };
};

const userExists = async ({ email, id }) => {
  const db = await connection();
  let user = null;
  if (id) {
    user = await db.collection('usuarios').findOne({ _id: ObjectId(id) });
  } else {
    user = await db.collection('usuarios').findOne({ email });
  }
  return user;
};

const deleta = async ({ id }) => {
  const db = await connection();
  await db.collection('usuarios').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const login = async ({ email, senha }) => {
  const db = await connection();
  const user = await db.collection('usuarios').findOne({ email, senha });
  return user;
};
const requestLogin = async (req, res) => {
  const { email, senha} = req.body;
  const usuario = await login({ email, senha });

  if (!usuario) return res.status(401).json({ message: 'EMAIL ou SENHA não Incorredo.' });
  const { _id } = usuario;

  const newToken = jwt.sign(
    {
      userid: _id,
      email,
    },
    SECRET,
    {
      expiresIn: 1440,
    },

  );
  return res.status(201).json({ tokenjwt: newToken, usuario: email });
};

export {
  getAll, newUsers, userExists, deleta, login, requestLogin,
};
