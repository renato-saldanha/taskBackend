module.exports = app => {
  app.post('/cadastro', app.api.usuario.save);
  app.post('/logar', app.api.auth.logar);

  app.route('/tasks')
  .all(app.config.passport.authenticate())
  .get(app.api.task.listarTasks)
  .post(app.api.task.gravar)

  app.route('/tasks/:id')
  .all(app.config.passport.authenticate())
  .delete(app.api.task.deletar)

  app.route('/tasks/:id/alterar')
  .all(app.config.passport.authenticate())
  .put(app.api.task.alterarTaks)
}