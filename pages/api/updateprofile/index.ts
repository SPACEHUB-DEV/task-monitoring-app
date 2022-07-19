import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../common/modules/models/User'

type Data = {
  data?: any
  success: boolean
  error?: any
}

async function start() {
  await dbConnect()
}
start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({})
        return res.status(201).json({ success: true, data: users })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'POST':
      try {
      } catch (error) {
        return res.status(400).json({ success: false })
      }
  }
}
