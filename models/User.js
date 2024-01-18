const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Add auto-increment to the User schema
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
