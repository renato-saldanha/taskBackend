const moment = require("moment");

module.exports = (app) => {
  const listarTasks = (req, res) => {
    const date = req.query.date
      ? req.query.date
      : moment().endOf("day").toDate();

    app
      .db("tasks")
      .where({ idUsuario: req.user.id })
      .where("dataestimada", "<=", date)
      .orderBy("dataestimada")
      .then((tasks) => res.json(tasks))
      .catch((err) => res.status(400).json(err));
  };

  const gravar = (req, res) => {
    if (!req.body.descricao) {
      return res.status(400).send("Descrição é obrigatória.");
    }

    req.body.IdUsuario = req.user.id;

    app
      .db("tasks")
      .insert(req.body)
      .then((_) => res.json(req.body))
      .catch((err) => res.status(400).json(err));
  };

  const deletar = async (req, res) => {
    await app
      .db("tasks")
      .where({ id: req.params.id, IdUsuario: req.user.id })
      .del()
      .then((data) => {
        res.status(204).send(data);
      })
      .catch((err) => res.status(400).json(err));
  };

  const atualizarTaskConcluida = (req, res, dataConclusao) => {
    app
      .db("tasks")
      .where({ id: req.params.id, IdUsuario: req.user.id })
      .update({ dataConclusao })
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };

  const alterarTaks = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, IdUsuario: req.user.id })
      .first()
      .then((task) => {
        if (!task) {
          const msg = `Não foi encontrada task com esse id: ${req.param.id}`;
          return res.status(400).send(msg);
        }

        const dataConclusao = task.dataconclusao ? null : new Date();
        atualizarTaskConcluida(req, res, dataConclusao);
      })
      .catch((err) => res.status(400).json(err));
  };

  return { listarTasks, gravar, deletar, alterarTaks };
};
