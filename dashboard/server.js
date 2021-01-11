const express = require('express')
const app = express()

app.set('views', './dashboard/views')

app.get('/', (req, res) => res.render('index.pug'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is live on port ${port}`));