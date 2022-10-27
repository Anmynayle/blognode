const router = require('express').Router()

const categoryServices = require('./categories.services')
const {getPostByCategory}= require('../post/post.services')

router.route('/') //? /categories
    .get(categoryServices.getAllCategories)
    .post(categoryServices.postCategory)
//? /api/v1/categories/:id

router.get('/:id', categoryServices.getCategoryById)

router.get('/:id/post', getPostByCategory)
module.exports = router