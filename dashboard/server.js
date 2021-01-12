const express = require('express');
const app = express();

app.set('views', './dashboard/views');
app.set('view engine', 'pug');

/**
app.use(express.static('./assets'));
app.locals.basedir = './assets';
*/

app.get('/', (req, res) => res.render('index'));
app.get('/commands', (req, res) => res.render('commands', {
  subtitle: 'Commands',
  categories: [
    { name: 'AutoMod' },
    { name: 'Welcome Message' },
    { name: 'Music bot integration' },
    ]
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is live on port ${port}`));