const Clarifai = require('clarifai');
//const { json } = require('body-parser');
//const { json } = require('body-parser');

//password protection 
const app = new Clarifai.App({
    apiKey: 'af6d9f946c5b41bdad3e5ba50d1386b0'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
    handleImage, 
    handleApiCall
}