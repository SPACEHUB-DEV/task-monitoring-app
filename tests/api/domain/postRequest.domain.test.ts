import handler from '@pages/api/domain/index'
import { getCurrentUser } from '@utils/getCurrentUser'
import { setupTestEnvironment } from '@utils/setupTestEnvironment'
import { users } from '@utils/testData'

const { expect } = require('@jest/globals')

jest.mock('@pages/api/api.config', () => jest.fn())
jest.mock('@utils/getCurrentUser', () => ({ getCurrentUser: jest.fn() }))

setupTestEnvironment()

describe('Domain API - POST', () => {
  it('should create a new domain - success', async () => {
    const mockReq = {
      method: 'POST',
      body: {
        name: 'domain 0',
        adminEmails: [users.domainAdmin.email],
        streets: [],
        description: 'none',
      },
    } as any
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    } as any

    ;(getCurrentUser as any).mockResolvedValueOnce({ isGlobalAdmin: true })

    await handler(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(201)
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          name: 'domain 0',
          adminEmails: [users.domainAdmin.email],
          streets: [],
          description: 'none',
        }),
      })
    )
  })
  it('should not create a new domain because it already exists', async () => {
    const mockReq = {
      method: 'POST',
      body: {
        name: 'domain 0',
        adminEmails: [users.domainAdmin.email],
        streets: [],
        description: 'none',
      },
    } as any
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    } as any

    ;(getCurrentUser as any).mockResolvedValueOnce({ isGlobalAdmin: true })

    await handler(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(400)
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: 'Домен з такими даними вже існує',
      })
    )
  })
})
