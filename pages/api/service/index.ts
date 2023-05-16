/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import start, { Data } from 'pages/api/api.config'
import Service from '@common/modules/models/Service'
import { getCurrentUser } from '@utils/getCurrentUser'

start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { session, isAdmin } = await getCurrentUser(req, res)

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

        const services = await Service.find(props)
          .sort({ data: -1 })
          .limit(req.query.limit)

        return res.status(200).json({
          success: true,
          data: services,
        })
      } catch (error) {
        return res.status(400).json({ success: false })
      }

    case 'POST':
      try {
        if (isAdmin) {
          // TODO: body validation
          const service = await Service.create(req.body)
          return res.status(200).json({ success: true, data: service })
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
