import { auth } from "@/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await auth(req, res)
    res.json(session)
}