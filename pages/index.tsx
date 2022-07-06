import { Space } from 'antd'
import { useSession } from 'next-auth/react'
import { useGetUserByEmailQuery } from '../api/userApi/user.api'

import Dashboard from './dashboard'

export default function Home() {
  const { data: session, status } = useSession()

  const { data, error, isLoading } = useGetUserByEmailQuery(
    `${session?.user?.email}`
  )
  const user = data?.data

  return (
    <div>
      <Dashboard />
      {/* <Space direction="vertical" size="large">
        <h1>Home</h1>
        <p>Helooo: {user?.name}</p>
        <p>site for search work</p>
      </Space> */}
    </div>
  )
}
