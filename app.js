const express = require('express');
const { result } = require('lodash');

//mongoDB connecter
const mongoose = require('mongoose');

// express app
const app = express();

//connect to mongoDB
const dburl = 'mongodb+srv://anirudh:Anirudh*%402410@cluster0.lef3nqr.mongodb.net/node?retryWrites=true&w=majority'
mongoose.connect(dburl).then((result)=>app.listen(3000)).catch((err)=>console.log(err));
//logger with middleware
const morgan = require('morgan');
const Blog = require('./models/blog');

// import blogs
const blogs = require('./models/blog');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

/* app.use((req,res,next)=>{
  console.log('host', req.hostname);
  console.log('method', req.method);
  next();
}); */


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  
    
      res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


//sand-box method to add blogs
/* app.get('/addblog',(req,res)=>{
  const blog = new Blog({
    title: 'my first mongoDB insert',
    snippet: 'mongo DB ftw',
    body: 'Node is cool but i like python frameworks much better '

  });

  blog.save().then((result)=>res.send(result)).catch((err)=> console.log(err));
})

// sandbox to retrieve blogs

app.get('/getblogs', (req,res)=>{

  Blog.find().then((result)=>res.send(result)).catch((err)=>console.log(err));
})

// single blog

app.get('/findid', (req,res)=>{

  blogs.findById("6320690cd4db005c3a372cf3")
  .then((result)=> res.send(result)).catch((err)=> console.log(err));

}) */


app.get('/blogs', (req, res)=>{

  Blog.find().sort({createdAt:-1})
  .then((result)=>{

    res.render('index', {title: 'Enter a new piece of info', blogs: result});

  })
  .catch((err)=>console.log(err));

})

app.post('/blogs', (req, res)=>{

  console.log(req.body);

  const blog = new Blog(req.body);

  blog.save().then((result)=> {
    res.redirect('/blogs');
  });

})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});