const router = require("express").Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1264850",
  key: "07efca5f2beda425ca35",
  secret: "81a806526a963280b667",
  cluster: "ap2",
  useTLS: true,
});

router.get("/", (req, res) => {
  res.send("400 OK");
});

router.post("/", (req, res) => {
  pusher.trigger("poll", "vote", {
    points: 1,
    food: req.body.food,
  });

  return res.json({
    success: true,
    message: "Your response has been recorded, Thanks for voting!",
  });
});

module.exports = router;
