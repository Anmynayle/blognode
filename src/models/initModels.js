const Users = require('./users.models')
const Post = require('./post.models')
const Categories = require('./categories.models')

const initModels = () => {
    //* 1-> M
    //? Una publicacion pertenece a un usuario
    Post.belongsTo(Users)
    //? Un usuario tiene muchas publicacioens
    Users.hasMany(Post)

    //*1 -> M
    //? Una publicacionn, pertenece a una categoria
    Post.belongsTo(Categories)
    //? Una categoria, tiene muchas publicacioens
    Categories.hasMany(Post)
}


module.exports = initModels