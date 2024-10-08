/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import User from '@modules/models/User'
import start, { Data } from '@pages/api/api.config'
import type { NextApiRequest, NextApiResponse } from 'next'

start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({})
        return res.status(200).json({ success: true, data: users })
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
