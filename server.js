const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let bugs = [];

app.get('/bugs', (req, res) => {
    res.json(bugs);
});

app.post('/bugs', (req, res) => {
    bugs.push(req.body);
    res.send("Bug Added");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
