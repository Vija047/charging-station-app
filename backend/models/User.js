const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      default: function () {
        return this.email.split("@")[0];
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to ensure unique username
userSchema.pre("save", async function (next) {
  if (!this.isModified("username")) return next();

  try {
    let baseUsername = this.username || this.email.split("@")[0];
    let username = baseUsername;
    let counter = 1;

    // Keep trying until we find a unique username
    while (true) {
      const existingUser = await this.constructor.findOne({ username });
      if (!existingUser) {
        this.username = username;
        break;
      }
      username = `${baseUsername}${counter}`;
      counter++;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
