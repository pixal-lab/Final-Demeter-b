import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

export function createAccessToken(payload){
    return new Promise((resolve, reject) => { 
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: 600, // 10 minutos = 600 segundos
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token)
            }
        ) 
    })
}