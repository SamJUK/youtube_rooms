module.exports = (req, res) => {
  // Server Rooms
  res.sendFile(BASE_PATH + '/public/room/index.html');
};
