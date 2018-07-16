module.exports = (req, res) => {
  res.render(BASE_PATH + '/public/views/rooms', {
    uid: req.session.uid,
    alias: users[req.session.uid].alias
  });
};
