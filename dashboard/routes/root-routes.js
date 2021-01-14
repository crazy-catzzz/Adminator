const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'AutoMod', icon: 'fas fa-gavel' },
    { name: 'Welcome Message', icon: 'fas fa-laugh' },
    { name: 'Music bot integration', icon: 'fas fa-music' }
    ],
}));

module.exports = router;