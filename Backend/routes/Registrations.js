const express = require('express');
const router = express.Router();
const Registration = require('../models/Registrations');

router.post('/api/registration', async (req, res) => {
  const { eventName, eventDate, userEmail, userPhone } = req.body;
  console.log(eventName);
  

  if (!eventName || !eventDate || !userEmail || !userPhone) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    const registration = new Registration({
      eventName,
      eventDate,
      userEmail,
      userPhone,
    });

    await registration.save();

    res.status(201).json({ message: 'Successfully registered for the event!', registration });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Failed to register for the event!' });
  }
});

router.get('/get-registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found!' });
    }

    res.status(200).json({ message: 'Registration deleted successfully!' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Failed to delete registration!' });
  }
});

module.exports = router;
