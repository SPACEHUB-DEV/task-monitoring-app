// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import RealEstate from '@common/modules/models/RealEstate'
import { getCurrentUser } from '@utils/getCurrentUser'
import start, { Data } from '@pages/api/api.config'
import Domain from '@common/modules/models/Domain'
import Street from '@common/modules/models/Street'

start()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { isGlobalAdmin, isDomainAdmin, isAdmin, isUser, user } =
    await getCurrentUser(req, res)

  switch (req.method) {
    case 'GET':
      try {
        await Domain.find({});
        await Street.find({});
        
        const options = {}
        const { domainId, streetId } = req.query
        if (isGlobalAdmin && domainId && streetId) {
          options.domain = domainId
          options.street = streetId
        }

        if (isDomainAdmin) {
          const domains = await Domain.find({
            adminEmails: { $in: [user.email] },
          })
          const domainsIds = domains.map((i) => i._id)
          options.domain = { $in: domainsIds }
        }

        if (isUser) {
          options.adminEmails = { $in: [user.email] }
        }

        const realEstates = await RealEstate.find(options)
          .sort({ data: -1 })
          .limit(req.query.limit)
          .populate({
            path: 'domain',
            select: '_id name description',
          })
          .populate({ path: 'street', select: '_id address city' })

        return res.status(200).json({ success: true, data: realEstates })
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message})
      }

    case 'POST':
      try {
        if (!isAdmin) {
          return res
            .status(400)
            .json({ success: false, message: 'not allowed' })
        }
        // TODO: body validation
        const realEstate = await RealEstate.create(req.body)
        return res.status(200).json({ success: true, data: realEstate })
      } catch (error) {
        return res.status(400).json({ success: false, message: error })
      }
  }
}
