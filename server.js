const express = require('express');
const path = require('path');

const routes = [
  {
    path: '/',
    file: '/login/login.html',
  },
  {
    path: '/login',
    file: '/login/login.html',
  },
  {
    path: '/main',
    file: '/main/main.html',
  },
  {
    path: '/profile',
    file: '/profile/profile.html',
  },
  {
    path: '/change-profile',
    file: '/profile/changeProfile.html',
  },
  {
    path: '/change-password',
    file: '/profile/changePassword.html',
  },
  {
    path: '/signin',
    file: '/signin/signin.html',
  },
]

const app = express();
const port = 3000;

const filesDirectory = `${__dirname}/dist`;
app.use(express.static(path.join(__dirname, 'dist')));


routes.forEach(({ path, file }) => {
  app.get(path, function(req, res) {
    res.sendFile(`${filesDirectory}${file}`);
  });
})

app.use(function (req, res, next) {
  res.status(404).sendFile(`${filesDirectory}/errorPages/404.html`);
});

app.listen(port);
