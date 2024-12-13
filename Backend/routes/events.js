const express = require('express');
const Event = require('../models/Event');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const event = new Event({ name, date, description });
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, description },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
