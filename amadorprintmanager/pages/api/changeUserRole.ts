import { auth } from "@/auth";
import db from "@/lib/db";
import { roles } from "@/types/Constants";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let user = await auth(req, res)
    if(!user){
        return
    }
    if(!user?.user){
        return
    }
    if(user.user.role !== "admin"){
        res.status(401).json({ error: "Not authorized" })
        return
    }
    let userget = await db.collection("users").findOne({
        _id: new ObjectId(req.body.id)
    })
    if(!userget){
        res.status(404).json({ error: "User not found" })
        return
    }
    await db.collection("users").updateOne({
        _id: new ObjectId(req.body.id)
    }, {
        $set: {
            role: req.body.role
        }
    })
    res.status(200).json({
        message: "updated"
    })
}