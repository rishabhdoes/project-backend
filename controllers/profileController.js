const db = require("../db");
const { sendMsg } = require("../utils/errors");

const getProfile = async (req, res) => {
  try {
    const { id } = req.body;
    const { rows, rowCount } = await db.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    if (rowCount === 0) {
      return sendMsg(res, 400, false, "User not found!");
    }
    const user = rows[0];
    return sendMsg(res, 200, true, user);
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { id, newName, newEmail, newPhoneNumber } = req.body;
    const { rows, rowCount } = await db.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    if (rowCount === 0) {
      return sendMsg(res, 400, false, "User not found!");
    }
    const user = rows[0];
    await db.query(
      `UPDATE users SET name = $2, email = $3, phone_number = $4 WHERE id = $1`,
      [id, newName, newEmail, newPhoneNumber]
    );
    return sendMsg(res, 200, true, "Profile Updated");
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({
      message: error.toString(),
    });
  }
};

const toggleUserBlockedStatus = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const queryToggleIsBlocked = `
  UPDATE users
  SET is_blocked = NOT is_blocked
  WHERE id = $1;
`;

    await db.query(queryToggleIsBlocked, [userId]);
    res.status(200).json({ message: "Updated!!" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateProfile,
  getProfile,
  toggleUserBlockedStatus,
};
