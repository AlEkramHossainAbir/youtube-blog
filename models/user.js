const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString();

  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.password = hashPassword;
  this.salt = salt;

  next();
});

userSchema.static('matchPassword',async function(email,password){
  const user = await this.findOne({email})
  if(!user) throw new Error("User not found");
  
  const salt = user.salt;
  const hashPassword = user.password
  console.log(email,salt,hashPassword)

  const userProvidedHash = createHmac("sha256", salt)
  .update(password)
  .digest("hex");

  if(userProvidedHash !== hashPassword){
    throw new Error("Invalid password");
  }

  return {...user, password: undefined, salt: undefined}
})

const User = mongoose.model("user", userSchema);

module.exports = User;
