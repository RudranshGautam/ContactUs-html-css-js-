const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS and JS
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); // Use EJS to render HTML files

// Route to render the contact form
app.get('/contactus', (req, res) => {
    res.render('contact');
});

// Route to handle form submission
app.post('/contactus', (req, res) => {
    const { name, email } = req.body;
    // Here you can add logic to save the data or send an email
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect('/success');
});

// Route to render the success page
app.get('/success', (req, res) => {
    res.render('success');
});

// 404 Page Not Found route
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});