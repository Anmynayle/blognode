const { DataTypes } = require('sequelize')
const db = require ('../utils/database')

const Categories = db.define('categories',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    //? evita que sequialize agregue las columnas de crteatedAt y updateAt
    timestamps: false

})

module.exports = Categories