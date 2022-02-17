const express = require('express');

const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  // express will hang w/o the call to next
  next();
  // actions go here before being sent to client...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl} ${delta}ms`);
});

// looks at request.body for a js object if content-type is application json
app.use(express.json());

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
