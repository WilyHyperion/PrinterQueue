// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from "@/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from "formidable";
export const config = {
    api: {
      bodyParser: false,
    },
  };
  import db from "@/lib/db";
 const mongodb =  require("mongodb");
 const bucket = new mongodb.GridFSBucket(db, {
    "bucketName": "jobfiles"
 });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let session = await auth(req, res)
    if(!session){
        return
    }
    if(!session?.user){
        return
    }
    const form = new Formidable();
     form.parse(req, (err: any, fields: any, files: any) => {
        console.log("fields", fields);
        console.log("files", files);
        let name = fields.name;
        if(!session?.user){
            return
        }
        let userid = session.user.id;
        console.log("userid", userid);
        console.log("name", name);
        console.log("file", files.file[0]);
    });
    res.status(200).json({ success: true });
}
