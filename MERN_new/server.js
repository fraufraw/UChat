const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const posts= require('./routes/api/posts');
const message=require('./routes/api/message');
const user=require('./routes/api/user');
const searchtitle=require('./routes/api/searchtitle');
const myposts=require('./routes/api/myposts');
const searchcomment=require('./routes/api/searchcomment');
const searchdescription=require('./routes/api/searchbydescription');
const othersposts=require('./routes/api/othersposts');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/posts', posts);
app.use('/api/message', message);
app.use('/api/user', user);
app.use('/api/searchtitle', searchtitle);
app.use('/api/myposts', myposts);
app.use('/api/searchcomment', searchcomment);
app.use('/api/searchbydescription', searchdescription);
app.use('/api/othersposts', othersposts);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));