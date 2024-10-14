const express = require("express");
const router = express.Router();
const messageController = require("../../../controllers/api/v1/messages");

router.post("/", messageController.create);
router.get("/", messageController.index);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;