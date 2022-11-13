import { getAll, newUsers, userExists, deleta } from '../Models/usuariosModel';

const todos = async () => {
  const users = await getAll();
  return users;
};

const criar = async ({ email, senha }) => {
  const user = await userExists({email});
  if (user) return user;
  const novoUsuario = await newUsers({ email, senha });
  return novoUsuario;
};

const deletar = async ({ id }) => {
  const user = await userExists({ id });
  if (!user) return { message: 'user not found' };
  const userDelete = await deleta({ id });
  return userDelete;
};

export { todos, criar, deletar };
