import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import { where } from 'sequelize'
import { v4 } from 'uuid'
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

export const registerService = async = ({ phone, password, name }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            default: {
                phone,
                name,
                password: hashPassword(password),
                id: v4()
            }
        })

        const token = response[1] && jwt.sign(
            { id: response[0].id, phone: response[0].phone },
            process.env.SECRET_KEY, { expiresIn: '2d' }
        )

        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register successfully ' : 'Phone number has been already user ',
            token: token || null
        })

    } catch (error) {
        reject(error)
    }
})