module.exports = app => {
  app.post('/cadastro', app.api.usuario.save);
  app.post('/logar', app.api.auth.logar);
}