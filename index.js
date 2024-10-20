const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2  point per $1

// Q1 cart-total
app.get('/cart-total', (request, response) => {
  const { newItemPrice, cartTotal } = request.query;
  const total = parseFloat(newItemPrice) + parseFloat(cartTotal);
  response.send(total.toString());
});

// Q2 isMember
app.get('/membership-discount', (request, response) => {
  const { cartTotal, isMember } = request.query;
  const total = parseFloat(cartTotal);
  const discount = isMember === 'true' ? (total * discountPercentage) / 100 : 0;
  const finalPrice = total - discount;
  response.send(finalPrice.toFixed(2).toString());
});

// Q3 calculate-tax
app.get('/calculate-tax', (request, response) => {
  const { cartTotal } = request.query;
  const total = parseFloat(cartTotal);
  const tax = (total * taxRate) / 100;
  response.send(tax.toFixed(2).toString());
});

// Q4 estimate-delivery
app.get('/estimate-delivery', (request, response) => {
  const { shippingMethod, distance } = request.query;
  const dist = parseFloat(distance);
  const deliveryDays =
    shippingMethod == 'express' ? Math.ceil(dist / 100) : Math.ceil(dist / 50);
  response.send(deliveryDays.toString());
});

// Q5 shipping-cost
app.get('/shipping-cost', (request, response) => {
  const { weight, distance } = request.query;
  const shippingCost = parseFloat(weight) * parseFloat(distance) * 0.1;
  response.send(shippingCost.toFixed(2).toString());
});

// Q6 loyalty-points
app.get('/loyalty-points', (request, response) => {
  const { purchaseAmount } = request.query;
  const points = parseFloat(purchaseAmount) * loyaltyRate;
  response.send(points.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
