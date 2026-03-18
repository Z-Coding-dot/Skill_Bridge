const { getAllMessages } = require("../data/messages.data");

const getMessages = (req, res, next) => {
  try {
    const messages = getAllMessages();

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMessages,
};
