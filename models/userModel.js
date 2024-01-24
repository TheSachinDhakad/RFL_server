const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);
module.exports = User;






















// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userModel = mongoose.Schema({
//     name: {
//         type: String,
//         required: true, // 'require' should be 'required'
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// }, {
//     timestamps: true, // 'timeStamp' should be 'timestamps'
// });

// userModel.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// userModel.pre("save", async function (next) {
//     if (!this.isModified('password')) { // Check for modification of the password field
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });


// const User = mongoose.model("User", userModel); // 'model' should be lowercase
// module.exports = User;
