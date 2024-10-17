const Admin = require("./model.admin")
const serviceAdmin = {}

// serviceAdmin.createAdmin = async ({email, password}) => {

//     console.log(email, password)
// return await Admin.create({email, password})
// }

//  check Email & Password


serviceAdmin.getAdminEmail = async (email) => {
    return await Admin.find({email})
  };

module.exports = serviceAdmin


