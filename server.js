const express = require('express');
const path = require('path');

const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  // express will hang w/o the call to next
  next();
  // actions go here before being sent to client...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')));

// looks at request.body for a js object if content-type is application json
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'My Friends are Very Clever',
    caption: "Let's go skiiing!",
  });
});
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
