function getMessages(req, res) {
  res.send('<ul><li>yoe</li><li>yoe yoe</li></ul>');
}

function postMessage(req, res) {
  console.log('Updating messages...');
}

module.exports = {
  getMessages,
  postMessage,
};
