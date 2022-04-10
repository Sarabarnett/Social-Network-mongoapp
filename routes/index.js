const router = require('express').Router();
//import API routes
const apiRoutes = require('./api');

//add prefixes to routes
router.use('/api', apiRoutes);


router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;