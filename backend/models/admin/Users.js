const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (pas) {
    return await bcrypt.compare(this.password, pas);
  };

  userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.pre("save", async function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const AdminUser = mongoose.model("AdminUsers", userSchema);
module.exports = AdminUser;
