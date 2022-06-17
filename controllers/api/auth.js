const router = require('express').Router();
const { User } = require('../..models');



router.post('/register', async (req, res) => {
    try {
        const Data = await User.create(
            {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            }
        );
        if (Data) {
            res.status(200).send('Good')
        }
        else {
            res.status(400).send('No user created, try again')
        }
    }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

router.get('/login', async (req, res) => {
    try {
        const data = await User.findOne({ where: {email: req.body.email}});

        if (!data) {
            res.status(400).json({message: 'Wrong email or password, please try again'});
            return;
        }
        const correctPW = await data.checkPassword(req.body.password);

        if (!correctPW) {
            res.status(400).json({message: 'Wrong email or password, please try again'});
            return;
        }
        req.session.save(()=> {
            req.session.user_id = data.id;
            req.session.loggedIn = true;
        });

        res.json({user: data, message: 'You have logged in'});
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;