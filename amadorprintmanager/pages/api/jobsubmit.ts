// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from "@/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from "formidable";
import { Job } from "@/lib/types";

const fs = require('fs')
export const config = {
    api: {
      bodyParser: false,
    },
  };
  import db, { bucket } from "@/lib/db";

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
     form.parse(req, async (err: any, fields: any, files) => {
        let name = fields.name[0];
        if(!session?.user || !files){
            return
        }
        let userid = session.user.id;
        let object = await db.collection("Jobs").insertOne({
          userId: userid,
          status: "submited",
          name: name,
          date: new Date(),
          inFillPercentage: fields.inFillPercentage[0],
          color: fields.color[0],
          printer: fields.printer[0],
          notes: fields.notes[0],
        } as Job)
        let id = object.insertedId;
        if(!(files.file) ||! (files.file[0])){
          console.log("No file attached")
          return {
            error: "No file attached"
          }
        }
        console.log(files.file[0].newFilename)
        const readableStream = fs.createReadStream(files.file[0].filepath.toString());

         readableStream.pipe(bucket.openUploadStream(id + ".stl"))
    });
    res.status(200).json({ success: true });
}
