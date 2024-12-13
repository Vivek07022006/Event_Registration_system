const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/Registrations');
const cors = require('cors');
const Registration = require("./models/Registrations")

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);




app.post('/api/registration', async (req, res) => {
  const { eventName, eventDate,userName, userEmail, userPhone } = req.body;
  const usrName = userName;
  
  if (!eventName || !eventDate || !userEmail || !userPhone) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    const registration = new Registration({
      eventName,
      eventDate,
      usrName,
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


app.get('/api/get-registrations', async (req, res) => {
  try {
    const registrations = await Registration.find({userEmail:req.query.email});
    res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations!' });
  }
});

app.delete('/api/registration/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found!' });
    }
    console.log(`DELETE request received for ID: ${req.params.id}`);
    res.status(200).json({ message: 'Registration deleted successfully!' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: 'Failed to delete registration!' });
  }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
