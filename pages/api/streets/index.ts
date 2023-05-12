/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import start, { Data } from 'pages/api/api.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import User from '@common/modules/models/User'
import { Roles } from '@utils/constants'
import Street from '@common/modules/models/Street'

start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions)
  const user = await User.findOne({ email: session?.user?.email })

  if (!user) {
    return res.status(400).json({ success: false, message: 'not allowed' })
  }

  const isAdmin = user?.role === Roles.ADMIN

  switch (req.method) {
    case 'GET':
      try {
        const props = {}

        if (isAdmin) {
          if (req.query.email) {
            props.email = req.query.email
          }
        } else {
          props.email = session.user.email
        }

        const streets = await Street.find(props)
          .sort({ data: -1 })
          .limit(req.query.limit)

        return res.status(200).json({
          success: true,
          data: streets,
        })
      } catch (error) {
        return res.status(400).json({ success: false })
      }

    case 'POST':
      try {
        if (isAdmin) {
          // TODO: body validation
          const street = await Street.create(req.body)
          return res.status(200).json({ success: true, data: street })
        } else {
          return res
            .status(400)
            .json({ success: false, message: 'not allowed' })
        }
      } catch (error) {
        return res.status(400).json({ success: false })
      }
  }
}
