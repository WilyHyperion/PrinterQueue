
import db from './db'

const bcrypt = require('bcryptjs');
    export async function addUser (email: String, password:String) {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt)
       await db.email("users").insertOne({
           email: email,
           password: hashedPassword,
       })

   }
   export async  function getLoggedUser (email: String, password:String)  {
       const user = await db.collection("users").findOne({email: email})
       if(!user) {
           return {
               error: "User not found"
           }
       }
       const valid = await bcrypt.compare(password, user.password)
       if(!valid) {
           return {
               error: "Invalid password"
           }
       }
       return user
   }
   export async function getUserFromEmail  (email: String) {
       const user = await db.collection("users").findOne({email: email})
       if(!user) {
           return {
               error: "User not found"
           }
       }
       delete user.password
       return user
   }