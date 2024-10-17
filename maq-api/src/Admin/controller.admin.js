const adminService = require("./service.admin")
const adminController = {}
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config()


//Add Category

// adminController.createAdmin = async (req, res) => {
//    try {
//     const {email, password} = req.body
//      const hash = bcrypt.hashSync(password, 10)

//      const admin = await adminService.createAdmin({email, password:hash})
//      const token = jwt.sign({_id:admin?._id},process.env.TOKEN_SECRET)
//      return res.send({
//         status: "OK",
//         message: "Admin Register Successfully",
//         data: {
//           _id: admin._id,
//           token, 
//           email: newUser.email,
//         },
//       });
  
//    } catch (error) {
//     return res.send({ status: "ERR", message: "something went wrong",error, data: null });
//    }
// };

// Admin logon
adminController.adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let admin = await adminService.getAdminEmail(email);
  
      if (admin.length && admin[0]?.email === email) {
        let { password: hash } = admin[0];
        let isMatched = bcrypt.compareSync(password, hash);
  
        if (isMatched) {
          var token = jwt.sign({ _id: admin[0]?._id}, process.env.TOKEN_SECRET);
  
          return res.send({
            status: true,
            message: "Admin login successfully",
            data: {
              token: token,
            },
            code: "OK",
            issue: null,
          });
        } else {
          return res.send({
            status: false,
            message: "Invalid  password",
            code: "ERROR",
            issue: "Login failed",
          });
        }
      } else {
        return res.send({ message: "Admin not found" });
      }
    } catch (error) {
      return res.send({ message: "Somthing want wrong", Error: error });
    }
};
  


  module.exports = adminController