const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const controllers = require('./controller');
const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    })
);
// 쿠키 옵션 설정 미들웨어
app.use((req, res, next) => {
    app.locals.cookieOptions = {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }
    next();
})

app.get('/comments/:picID', controllers.getComments);
app.post('/comments/:picID', controllers.addComments);
app.patch('/comments/:picID', controllers.editComments);
app.post('/login', controllers.login);
/* app.post('/logout', controllers.logout);
app.get('/userinfo', controllers.userInfo); */

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/ 서버가 열렸습니다!`);
});