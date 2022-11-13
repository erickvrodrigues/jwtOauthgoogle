import { todos, criar, deletar } from '../Service/usuarioService';

const getAll = async (req, res) => {
  const users = await todos();
  const id = '_id';
  const newList = users.map((user)=>(
    {
      email: user.email,
      _id: user[`${id}`],
    }
  ));
  return res.status(200).json(newList);
};

const criarUser = async (req, res) => {
  const { email, senha } = req.body;
  const { email: mail, _id } = await criar({ email, senha });
  return res.status(200).json({ mail, _id });
};

const deleteUser = async (req, res) =>{
  const { id } = req.params;

  const user = await deletar({ id });
  return res.status(200).json(user);
};

const login = async (req, res) => { return res.status(200); };

export { getAll, login, criarUser, deleteUser };
