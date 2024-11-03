
import db from './db'

const bcrypt = require('bcryptjs');
    export async function addUser (email: String, password:String, studentID: number) {
        //TODO Validate info
        let user = await db.collection("users").findOne({$or : [{email: email}, {studentID: studentID}]})
        if(user){
            console.log(user)
            return {
                error: user.email === email ? "Email already in use." : "Student ID already in use"
            }
        }
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt)
       await db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
        studentID: studentID,
        role: "student"
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