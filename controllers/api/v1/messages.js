const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {
  const user = req.body.message.user;
  const text = req.body.message.text;

  const m = new Message({ user: user, text: text });
  m.save().then(() => {
    res.json({
      status: "success",
      data: {
        message: m,
      },
    });
  });
};

const index = async (req, res) => {
  try {
    const { user } = req.query; 
 
    if (user) {
      const messages = await Message.find({ user: user });
      return res.json({
        status: "success",
        message: "Berichten succesvol opgehaald voor gebruiker",
        data: {
          messages: messages,
        },
      });
    }


    const messages = await Message.find({});
    res.json({
      status: "success",
      data: {
        messages: messages,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params; 
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
    }
    res.json({
      status: "success",
      data: {
        message: message,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params; 
    const { text } = req.body.message;

   
    const message = await Message.findByIdAndUpdate(
      id,
      { text: text }, 
      { new: true, runValidators: true } 
    );

    if (!message) {
      return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
    }

 
    res.json({
      status: "success",
      message: "Bericht succesvol bijgewerkt",
      data: {
        message: message,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; 
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
    }
    res.json({ status: "success", message: "Bericht succesvol verwijderd" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

module.exports = {
  create,
  index,
  show,
  update,
  deleteMessage,
};