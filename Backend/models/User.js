const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'User'] },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = this.password;
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await (password === this.password);
};

module.exports = mongoose.model('User', userSchema);
