const express = require('express');
const userService = require('../services/userService');
const { validateName, validateRegister, validatePassword } = require('../validations/userValidation');
const handleRoleAuthorization = require('../middlewares/handleAuthorization');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    res.send(await userService.getUsers());
  }
  catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    res.send(await userService.getUser(req.params.id));
  }
  catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  try {
    validateName(req.body.name);
    validateRegister(req.body.register);
    validatePassword(req.body.password);

    res.send(await userService.createUser(req.body.name, req.body.register, req.body.password));
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
