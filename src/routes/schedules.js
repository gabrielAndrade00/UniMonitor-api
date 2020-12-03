const express = require('express');
const router = express.Router();
const { validateWeekday, validateBegin, validateEnd, validateMonitoring } = require('../validations/scheduleValidation');
const scheduleService = require('../services/scheduleService');
const handleRoleAuthorization = require('../middlewares/handleAuthorization');

router.get('/', handleRoleAuthorization(['Student', 'Monitor', 'Professor', 'Admin']), async function(req, res, next) {
    try {
        res.send(await scheduleService.getSchedules());
    }
    catch (error) {
        next(error);
    }
});

router.post('/', handleRoleAuthorization(['Monitor', 'Admin']), async function(req, res, next) {
    try {
      validateWeekday(req.body.weekday);
      validateBegin(req.body.begin);
      validateEnd(req.body.end);
      validateMonitoring(req.body.monitoring);
  
      res.send(await scheduleService.createSchedule(req.body.weekday, req.body.begin, req.body.end, req.body.monitoring));
    }
    catch (error) {
      next(error);
    }
});

router.put('/:id', handleRoleAuthorization(['Monitor', 'Admin']), async function(req, res, next) {
  try {
    validateWeekday(req.body.weekday);
    validateBegin(req.body.begin);
    validateEnd(req.body.end);
    validateMonitoring(req.body.monitoring);

    res.send(await scheduleService.updateSchedule(req.params.id, req.body.weekday, req.body.begin, req.body.end, req.body.monitoring));
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:id', handleRoleAuthorization(['Monitor', 'Admin']), async function(req, res, next) {
  try {
    res.send(await scheduleService.deleteSchedule(req.params.id));
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
