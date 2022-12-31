const bcrypt = require("bcrypt");

const encryptionUtil = {
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    return { salt, encryptedPassword };
  },

  async comparePassword(password, salt, encryptedPasswordToCompareTo) {
    const { encryptedPassword } = await encryptionUtil.encryptPassword(
      password,
      salt
    );
    return encryptedPassword === encryptedPasswordToCompareTo;
  },
};

module.exports = encryptionUtil;
