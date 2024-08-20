const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://bojyaf:qwerty1234@cluster0.f7wclz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define routes
app.use('/api/items', require('./routes/items'));
app.use('/api/sales', require('./routes/sales'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
