import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'utils/dbConnect'
import User from 'common/modules/models/User'

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
        const user = await User.findOne({ email: req.query.email })
        return res.status(201).json({ success: true, data: user })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
    case 'PATCH':
      try {
        let user
        if (req.body.tel) {
          user = await User.findOneAndUpdate(
            { email: req.query.email },
            {
              isWorker: true,
              tel: req.body.tel,
              role: 'Worker',
            }
          )
        } else {
          user = await User.findOneAndUpdate(
            { email: req.query.email },
            { role: req.query.role }
          )
        }
        return res.status(201).json({ success: true, data: user })
      } catch (error) {
        return res.status(400).json({ success: false })
      }
  }
}
