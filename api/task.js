const moment = require("moment");

module.exports = (app) => {
  const listarTasks = (req, res) => {
    const date = req.query.date ? req.query.date : moment().endOf('day').toDate();

    app
      .db('tasks')
      .where({ IdUsuario: req.user.id })
      .where('dataEstimada', '<=', date)
      .ordeyBy('dataEstimada')
      .then((tasks) => console.log(tasks))
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
      .then(() => res.status(204).send("Registro salvo com sucesso!"))
      .catch((err) => res.status(400).json(err));
  };

  const deletar = (req, res) => {
    app
      .db("tasks")
      .where({ id: req.params.id, IdUsuario: req.user.id })
      .del()
      .then((rowsDel) => {
        if (rowsDel > 0) {
          res.status(204).send();
        } else {
          const msg = `Não foi encontrada task com esse id: ${req.param.id}`;
          res.status(400).send(msg);
        }
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

        const dataConclusao = task.dataConclusao ? null : new Date();
        atualizarTaskConcluida(req, res, dataConclusao);
      })
      .catch((err) => res.status(400).json(err));
  };

  return {listarTasks, gravar, deletar, alterarTaks };
};
