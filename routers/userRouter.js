const express = require('express');

const {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
//

const router = express.Router();
router.route('/').get(getUsers).post(createUser);
router.route('/user/:email').get(getUserByEmail);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
