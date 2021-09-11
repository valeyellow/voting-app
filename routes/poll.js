const router = require("express").Router();

const Pusher = require("pusher");

const Vote = require("../models/Vote");

const pusher = new Pusher({
  appId: "1264850",
  key: "07efca5f2beda425ca35",
  secret: "81a806526a963280b667",
  cluster: "ap2",
  useTLS: true,
});

router.get("/", async (req, res) => {
  const votes = await Vote.find();
  res.json({ success: true, votes });
});

router.post("/", async (req, res) => {
  const newVote = new Vote({
    food: req.body.food,
    points: 1,
  });

  try {
    const vote = await newVote.save();
    pusher.trigger("poll", "vote", {
      points: parseInt(vote.points, 10),
      food: vote.food,
    });

    return res.json({
      success: true,
      message: "Your response has been recorded, Thanks for voting!",
    });
  } catch (error) {
    console.log("Error saving your response! ", error);
  }
});

module.exports = router;
