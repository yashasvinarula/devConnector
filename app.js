const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();
const db = require('./config/keys').mongoURI;
const usersRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const postsRoutes = require('./routes/posts');

mongoose.connect(db)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extxended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/profile', profileRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server active'));
