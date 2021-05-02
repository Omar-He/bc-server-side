const express = require("express");
const router = express.Router();
const Call = require("../models/call");

// Getting all
router.get("/", async (req, res) => {
  try {
    const calls = await Call.find();
    res.json(calls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getCall, (req, res) => {
  res.json(res.call);
});

// Creating one
router.post("/", async (req, res) => {
  const call = new Call({
    name: req.body.name,
    call_reason: req.body.call_reason,
    call_date: req.body.call_date,
  });
  try {
    const newCall = await call.save();
    res.status(201).json(newCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getCall, async (req, res) => {
  if (req.body.name != null) {
    res.call.name = req.body.name;
  }
  if (req.body.call_reason != null) {
    res.call.call_reason = req.body.call_reason;
  }
  try {
    const updatedCall = await res.call.save();
    res.json(updatedCall);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getCall, async (req, res) => {
  try {
    await res.call.remove();
    res.json({ message: "Deleted Call" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCall(req, res, next) {
  let call;
  try {
    call = await Call.findById(req.params.id);
    if (call == null) {
      return res.status(404).json({ message: "Cannot find call" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.call = call;
  next();
}

module.exports = router;
