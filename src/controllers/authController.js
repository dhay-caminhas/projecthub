const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email ? req.body.email.trim().toLowerCase() : null;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email já cadastrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuário criado com sucesso', user: { id: user.id, name, email } });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email ? req.body.email.trim().toLowerCase() : null;
    const { password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Email não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Senha incorreta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login ok', token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' });
  }
};

exports.getAllUsers = async (req, res) => { res.json([]); };
exports.updateUser = async (req, res) => { res.json({}); };
exports.deleteUser = async (req, res) => { res.json({}); };