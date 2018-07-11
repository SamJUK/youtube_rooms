module.exports = (req, res) => {
  // Server Homepage
  res.render(BASE_PATH + '/public/views/homepage', {
    uid: req.session.uid,
    alias: users[req.session.uid].alias
  });
};
