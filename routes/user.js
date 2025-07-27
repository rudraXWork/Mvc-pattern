const express = require("express");
const { GetAllUsers,
        GetUsersById,
       UpdateUsersById,
       DeleteUsersById,
       CreateUserById,
 } = require("../controllers/user")

 const User = require("../models/user");

const router = express.Router();

// Route: Get all users
router.get("/api", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
      <ul>
        ${allDbUsers
          .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
          .join("")}
      </ul>
    `;
    res.send(html);
  });

  // Get all users
router.get("/", GetAllUsers );

// CRUD operations for single user
router
    .route("/:id")
    // Get user by ID
    .get(GetUsersById)
    // Update user by ID
    .patch(UpdateUsersById)
    // Delete user by ID
    .delete(DeleteUsersById);


// Route: Create a new user
router.post("/", CreateUserById);

  module.exports = router;