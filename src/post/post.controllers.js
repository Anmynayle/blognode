
const Posts = require('../models/post.models')
const uuid = require('uuid')
const Users = require('../models/users.models')
const Categories = require('../models/categories.models')

const getAllPosts = async (offset, limit) =>{
    const data = await Posts.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes:{
            exclude:['userId','categoryId','createdAt']
        },
        include:[
            {
                model: Users, 
                as:'user',
                attributes:{
                    exclude:['password','createdAt']
                }
            },
            {
                model: Categories,
                as:'category'
            }
        ]
    })
    return data
}

const getPostById = async (id) =>{
    const data = await  Posts.findOne({
        where: {
            id
        },
        attributes:{
            exclude:['userId','categoryId','createdAt']
        },
        include:[
            {
                model: Users, 
                as:'user',
                attributes:{
                    exclude:['password','createdAt']
                }
            },
            {
                model: Categories,
                as:'category'
            }
        ]
    })

    return data
}

const createPost = async (data)=>{
    const response = await Posts.create({
        id: uuid.v4(),
        title : data.title,
        content: data.content,
        userId: data.userId, //? este es el user id que viene desde el token//? este es el userid qye viene del token para saber el usuari que lo crea
        categoryId: data.categoryId 
    })
    return response
}

const getPostByCategory = async (categoryId)=>{
    const data = await Posts.findAll({
        where:{
            categoryId
        }
    })
    return data
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    getPostByCategory
}