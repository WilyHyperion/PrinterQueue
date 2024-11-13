import { NextApiRequest, NextApiResponse } from 'next';
import {addUser} from '../../lib/credentiallogins'
import { auth, signIn } from '@/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let t = await addUser(req.body.email, req.body.password, req.body.studentID)
    if(t && t.error) {
        res.status(400).json({ error: t.error })
        return
    }
    res.status(200).json({ success: true })
}