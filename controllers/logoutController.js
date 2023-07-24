// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const fsPromises = require("fs").promises;
// const path = require("path");
const User = require("../model/User");

const handleLogout = async (req, res) => {
  // on client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //no content
  }
  const refreshToken = cookies.jwt;

  // is refreshToken in DB?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); //no content
  }
  // delete refreshToken in DB
  // const otherUsers = usersDB.users.filter(
  //   (pers) => pers.refreshToken !== foundUser.refreshToken
  // );
  // const currUser = { ...foundUser, refreshToken: "" };
  // usersDB.setUsers([...otherUsers, currUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "users.json"),
  //   JSON.stringify(usersDB.users)
  // );

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure:true-only serves on https!
  res.sendStatus(204); //no content
};

module.exports = { handleLogout };
