const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/shop.html');
});

app.get('/admin/add-product', (req, res) => {
  res.sendFile(__dirname + '/addproduct.html');
});

app.get('/contactus', (req, res) => {
  res.sendFile(__dirname + '/contactus.html');
});

app.post('/success', (req, res) => {
  const { name, email } = req.body;
  // Save the form data or perform any necessary operations here

  // Redirect to the success page with a success message
  res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.send('Form successfully filled!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
