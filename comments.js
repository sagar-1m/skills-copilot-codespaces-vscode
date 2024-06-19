// Create web server
// Create JSON file
// Create POST request
// Create GET request
// Create DELETE request
// Create PUT request

const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const comments = require('./comments.json');

app.get('/comments', (req, res) => {
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = uuidv4();
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        } else {
            res.send(newComment);
        }
    });
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments.splice(index, 1);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
            } else {
                res.send('Comment deleted');
            }
        });
    }
});

app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const updatedComment = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments[index] = updatedComment;
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing file');
            } else {
                res.send('Comment updated');
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server started');
});
