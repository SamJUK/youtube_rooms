module.exports = (req, res) => {
  // Server Homepage
  res.sendFile(BASE_PATH + '/public/homepage/index.html');
};
