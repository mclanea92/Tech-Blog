const {Comment} = require('../../models');
const router = require('express').Router();


router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        if (newComment) {
            res.status(200).send(newComment)
        }
        else {
            res.status(400).send('No comment saved, please try again')
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});