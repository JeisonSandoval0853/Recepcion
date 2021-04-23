const express = require('express');
const router = express.Router();
const auth = require('../../midlewares/auth')


function renderDashboard(req, res) {
  res.render('dashboard', { layout: null })
}



router.get('/dashboard', auth,  renderDashboard);

module.exports = router;


