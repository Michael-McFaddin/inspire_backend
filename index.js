const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const pool = require('./db');
require('dotenv').config();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

//Routes
//create image
app.post('/images', async(req, res) => {
  try {
    const { name, url, category } = req.body;
    const newImage = await pool.query('INSERT INTO images (name, url, category) VALUES($1, $2, $3) RETURNING *', 
      [name, url, category]
    );
    res.json(newImage.rows[0]);
    // console.log(req.body);
  } catch (err) {
    console.log(err.message);
  }
});

//get all images
app.get('/images', async(req, res) => {
  try {
    const allImages = await pool.query('SELECT * FROM images');
    res.json(allImages.rows);
  } catch (err) {
    console.erro(err.message);
  }
});

//get an image
app.get('/images/:id', async(req, res) => {
  try {
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log(`server has started on port ${port}`)
});