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
    await db.collection("users").deleteOne({
        _id: new ObjectId(req.body.id)
    })
    res.status(200).json({
        message: "deleted"
    })
}