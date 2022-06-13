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

router.put('/:id', async (req, res) => {
    try {
        const commentUpdate = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (commentUpdate) {
            res.status(200).send(commentUpdate)
        }
        else {
            res.status(400).send('Comment not updated, please try again')
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
});


router.delete('/:id', async (req, res) => {
    try {const commentDelete = await Comment.destroy({
        where: {
            id: req.params.id
        }
    });
    if (commentDelete) {
        res.status(200).end();
    }
    else {
        res.status(400).end();
    }
}
catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;