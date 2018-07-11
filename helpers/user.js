const crypto = require("crypto");
module.exports = {

  /**
   * Generate a 16 character string
   * @return {String}
   */
  generateRandomString: function(){
      return crypto.randomBytes(16).toString("hex");
  },

/**
 * Generate a random UID for a user up to 25 attempts
 * @return {String}
 */
  generateUID: function(){
    // @TODO: Check if its already in use and that stuff
    return this.generateRandomString();
  }

};
