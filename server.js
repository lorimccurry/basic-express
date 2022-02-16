const express = require('express');
const messagesController = require('./controllers/messages.controller');
const friendsController = require('./controllers/friends.controller');

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  // express will hang w/o the call to next
  next();
  // actions go here before being sent to client...
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

// looks at request.body for a js object if content-type is application json
app.use(express.json());

app.get('/friends', friendsController.getFriends);
app.get('/friends/:friendId', friendsController.getFriend);
app.post('/friends', friendsController.postFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});
