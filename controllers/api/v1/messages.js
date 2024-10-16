const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {

    const text = req.body.message.text;
    const user = req.body.message.user;

    const m = new Message({ user: user, text: text });
    m.save().then(() => {

        res.json({
            status: "succes", 
            data: {
                message: m,
            },
        });

    });

};

const index = async (req, res) => {

    const messages = await Message.find();
    res.json({
        status: "succes",
        data:{ 
            messages: messages,
        },
    });

};



module.exports = {
    create,
    index
};