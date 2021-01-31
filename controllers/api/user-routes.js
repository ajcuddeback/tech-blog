const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.get('/', (req, res) => {
    User.findAll({

    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found at this id!' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})