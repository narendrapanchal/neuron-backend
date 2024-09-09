const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
},
role: {
  type: String,
  enum: ['user', 'admin', 'moderator'],  // Restrict to these roles
  default: 'user'  // Default role is 'user'
}
}, {
  versionKey: false,
  timestamps: true
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    // Replace the plain text password with the hashed one
    user.password = hashedPassword;
    
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = { User: model("user", userSchema), userSchema };
