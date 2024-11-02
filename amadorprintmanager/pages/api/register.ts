import { NextApiRequest, NextApiResponse } from 'next';
import {addUser} from '../../lib/credentiallogins'
import { auth, signIn } from '@/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    addUser(req.body.email, req.body.password)
    signIn("credentials", req.body)
    res.status(200).json({ success: true })
}