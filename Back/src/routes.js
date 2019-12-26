import express from 'express';
import { calculate } from './modules/bill';


const router = express.Router();

const routeHandler = ({ path, callback, method }) => {
  router.route(path)[method](async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      // rollbar.error(error);

      next(error);
    }
  });
};

// User routes
routeHandler({
  path: '/calculate',
  callback: calculate,
  method: 'post'
});


module.exports = router;

