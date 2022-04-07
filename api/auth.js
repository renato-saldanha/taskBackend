const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt1 = require("bcryptjs");

module.exports = (app) => {
  const logar = async (req, res) => {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send("Dados incompletos!");
    }

    const usuario = await app
      .db("USUARIOS")
      .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
      .first();

    if (usuario) {
      bcrypt1.compare(req.body.senha, usuario.senha, (err, achou) => {
        if (err || !achou) {
          return res.status(401).send("Senha inválida!");
        }

        const payload = {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
        };

        res.json({
          nome: usuario.nome,
          email: usuario.email,
          token: jwt.encode(payload, authSecret),
        });
      });
    } else {
      res.status(400).send("Usuário não encontrado!");
    }
  };

  return { logar };
};
