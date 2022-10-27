const postController = require('./post.controllers')
const { host } = require('../config')

const getAllPost = (req, res)=>{

    //? localhost:9000/api/v1/post?offset=0&limit=20
    const offset = Number (req.query.offset) || 0
    const limit = Number(req.query.limit) || 10
    //?offeset donde se  inicia
    //? limit cantidad maxima a mostrar

    const urlBase = `${host}/api/v1/post`

    
    postController.getAllPosts(offset,limit)
    .then(data=>{
            //* post?offset=20&limit=10
            //? length 33
            //? offset 12
            //? limirt 10
            const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit }&limit=${limit}` : null
            const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset-limit}&limit=${limit}`: null
            res.status(200).json({
                next: nextPage,
                prev: prevPage,
                item: data.count,
                offset,
                limit,
                results:data.rows
            })
        })
        .catch(err=>{
            res.status(400).json({message: err.message})
        })
}



const createPost = (req, res) => {
    //? Este es el id del usuario loggeado
    const userId = req.user.id 
    const { title, content, categoryId } = req.body
    if(title && content && categoryId){
        postController.createPost({title, content, userId, categoryId})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } else {
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                title: 'string',
                content: 'string',
                categoryId: 'uuid'
            }
        })
    }

}

const getPostByCategory = (req, res)=>{
    const categoryId = req.params.id
    postController.getPostByCategory(categoryId)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({message:err.message})
        })
}

module.exports = {
    createPost,
    getAllPost,
    getPostByCategory
}