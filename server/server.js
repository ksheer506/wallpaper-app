const jsonServer = require('json-server');
const server = jsonServer.create();
const defaultRouter = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Authentication
server.use(jsonServer.bodyParser);
server.post("/login", (req, res, next) => {
  const { id, password } = req.body;

  console.log(id, password, req.body);
})



server.use(defaultRouter)
server.listen(4000, () => {
  console.log('JSON Server is running')
})