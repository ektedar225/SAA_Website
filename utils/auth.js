const bcrypt = require("bcryptjs");
const logger = require("./logger");

async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      await bcrypt.genSalt(Number.parseInt(process.env.PASSWORD_SALT_ROUNDS))
    );
    return hashedPassword;
  } catch (error) {
    logger(`Error hashing password: ${error}`, "error");
    return null;
  }
}

async function comparePassword(newPassword, hashedPassword) {
  try {
    const match = bcrypt.compare(newPassword, hashedPassword);
    return match;
  } catch (error) {
    logger(`Error comparing password: ${error}`, "error");
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
