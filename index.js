const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'beyoncefan4life',
  resave: false,
  saveUninitialized: false
}));

app.post('/api/cart', (req, res) => {
  // add req.body to users session.

  // If the user does not have a cart
  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!req.body.name) {
    return res.status(400).send('You need to send me a product');
  }

  req.session.cart.push(req.body);

  res.status(200).send('ok');
});

app.get('/api/cart', (req, res) => {
  // return users cart from session.

  res.status(200).json(req.session.cart)
})


app.listen(3000, () => {console.log('Listening on 3000')})