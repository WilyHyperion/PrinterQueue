

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Job } from "@/lib/types";
import { auth } from "@/auth";
import db from "@/lib/db";
import { ObjectId } from "mongodb";


export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>,
) {
    let user = await auth(req, res)
    if(!user){
        return
    }
    if(!user?.user){
        return
    }
    let jobs = db.collection("Jobs").find({

    }, {
        sort: {
            date: -1
        }
    })
    let jobsl = await jobs.toArray()
    for(let job of  jobsl){
        job.id = job._id
        let id = new ObjectId(job.userId)
        console.log( id)
        let u = await db.collection("users").findOne({ _id: id })
        job.user = u

        console.log(u)
    }
    res.status(200).json(jobsl)
}
