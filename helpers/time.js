module.exports = {
  // Common units in milliseconds
  second: 1000,
  minute: 60 * this.second,
  hour: 60 * this.minute,
  date: 24 * this.hour,

  /**
   * Check if x milliseconds has elapsed between timestamp 1 and timestamp 2
   *
   * @param {Number} ts1 Timestamp to check from
   * @param {Number} ts2 Timestamp to check until
   * @param {Number} time Time elapsed in milliseconds
   * @return {Boolean}
   */
  hasTimeElapsed: function(ts1, ts2, time){
    return (ts2 - ts1) > time;
  }

};
