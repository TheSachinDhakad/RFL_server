// generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

module.exports = generateToken;










// const jwt = require('jsonwebtoken');


// const generateToken = (id)=>{
//     return jwt.sign({id} , process.env.WT_SECRET , {
//         expiresIn : "30d",
//     });

// }

// module.exports = generateToken;