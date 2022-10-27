const router = require('express').Router()
const passport = require('passport')

const postServices = require('./post.services')
require('../middlewares/auth.middleware')

router.route('/')
    .get(postServices.getAllPost)
    .post(
        passport.authenticate('jwt', {session:false}),
        postServices.createPost
    )

    module.exports = router