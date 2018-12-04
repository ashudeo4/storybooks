const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');
const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');



router.get('/', (req, res) => {
    Story.find({ status: 'public' })
        .populate('user')
        .then(stories => {

            res.render('stories/index', {
                stories: stories

            });

        })
});

router.get('/show/:id', (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .populate('user').then(story => {
            // console.log(story.user);

            res.render('stories/show', {
                story: story
            })
        })
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});


router.post('/', (req, res) => {
    let allowComments;
    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newstory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }
    new Story(newstory).save().then(Story => {
        res.redirect(`/stories/show/${Story.id}`);
    });

});

module.exports = router;