const { fetchDB } = require("../util/accessDB");

module.exports = async (req, res, next) => {
  const { picID } = req.params;
  const path = `${process.cwd()}/server/db/comments/${picID}.json`;
  const comments = await fetchDB(path);

  console.log(comments);

  res.status(200).send(comments);
}