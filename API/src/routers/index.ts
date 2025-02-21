import { Router } from "express";

// importáljuk az egyes modulok útvonalait
// const userRoutes = require('./user.router');


// regisztráljuk az útvonalakat
const router = Router();

// router.use('/users', userRoutes);

// router.use('/adverts', advertRoutes);

router.get('/', (req, res) => {
    res.send(`Router pinged.`);
  });


module.exports = router;