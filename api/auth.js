const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const logar = async (req, res) => {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send("Dadfos incompletos!");
    }

    const usuario = await app
      .db("usuarios")
      .where({ email: req.body.email })
      .first();

    if (usuario) {
      bcrypt.compare(req.body.senha, usuario.senha, (err, achou) => {
        if (err || !achou) {
          return res.status(401).send();
        }

        const payload = { id: usuario.id };
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

  return {logar}
};
