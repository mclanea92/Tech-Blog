const router = require('express').Router();

const { Post } = require('../..models');
const { post } = require('./auth');

router.post("/", async (req, res) => {
    try {
        const makeData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        if (makeData) {
            res.status(201).send(makeData)
        }
        else {
            res.status(400).send('No post created, please try again')
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postNew = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (postNew) {
            res.status(200).send(postNew)
        }
        else {
            res.status(400).send('No post created')
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.delete('/:id', async (req, res) => {
    try {
        const deleteData = await Post.destroy({
            where: {
                id: id.params.id
            }
        });
        if (deleteData) {
            res.status(200).send('Post has been deleted')
        }
        else{
            res.status(400).send('No post deleted, please try again')
        }
    }
    catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;