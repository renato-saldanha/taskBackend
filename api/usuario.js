const bcrypt1 = require('bcryptjs');

module.exports = (app) => {
  const hash = (senha, callback) => {
    const salt = bcrypt1.genSalt(10);
    bcrypt1.hash(senha, salt, (err, hash)=> callback(hash));
  } 

  const obterHash = (senha, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(senha, salt, null, (err, hash) => callback(hash));
    });
  };

  const gravar = (req, res) => {
    hash(req.body.senha, (hash) => {
      const senha = hash;
      app
        .db("USUARIOS")
        .insert({
          nome: req.body.nome,
          email: req.body.email,
          senha,
        })
        .then(() => res.status(204).send("Usuário gravado com sucesso!"))
        .catch((err) => res.status(400).json(err));
    });
  };

  return { gravar };
};
