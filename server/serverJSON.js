const cookieParser = require('cookie-parser');
const jsonServer = require('json-server');
const server = jsonServer.create();
const defaultRouter = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();


const controller = require("./controller");

server.use(middlewares);

// 쿠키 설정 미들웨어
server.use((req, res, next) => {
  req.cookieOptions = {
    /* domain: "localhost", */
    path: "/",  // path에 여러 경로를 설정하는 방법?
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }
  next();
})

// Authentication
server.use(cookieParser());
server.use(jsonServer.bodyParser);
server.post("/login", controller.login);



server.use(defaultRouter)
server.listen(4000, () => {
  console.log('JSON Server is running')
})