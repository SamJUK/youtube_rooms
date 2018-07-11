module.exports = (req, res) => {
  var uid = req.session.uid;

  // @TODO: VALIDATE VALIDATE VALIDATE
  var roomName = req.body.create_input;

  console.log(`Create Room: ${roomName} | UID: ${uid}`);

  rooms[roomName] = {
    owner: uid,
    public: false,
    room: {
      video: '',
      playbackstate: '0',
      videoprogress: { vtime: 0, time: 0 }
    }
  };
};
