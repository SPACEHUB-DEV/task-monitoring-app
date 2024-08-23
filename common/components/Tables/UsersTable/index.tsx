import { EditOutlined } from '@ant-design/icons'
import { useGetAllUsersQuery } from '@common/api/userApi/user.api'
import { Tags } from '@components/UI/Tags'
import { IUser } from '@modules/models/User'
import { Button, Table, TableColumnsType } from 'antd'
import { useMemo, useState } from 'react'

export interface UsersTableProps {}

export const UsersTable: React.FC<UsersTableProps> = ({}) => {
  const { data: users } = useGetAllUsersQuery()

  const columns = useMemo<TableColumnsType<IUser>>(() => {
    return [
      { dataIndex: 'name' },
      { dataIndex: 'email' },
      { dataIndex: 'roles', render: (roles) => <Tags items={roles} /> },
      {
        fixed: 'right',
        width: 48,
        render: (_, user) => <EditUserButton user={user?._id} />,
      },
    ]
  }, [])

  return (
    <Table
      dataSource={users}
      columns={columns}
      scroll={{ x: 800 }}
      // TODO: pagination on back-end and front-end
    />
  )
}

export const EditUserButton: React.FC<{ user?: IUser['_id'] }> = ({
  user: userId,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => setOpen((prev) => !prev)}
      />
      {/* TODO: create and add EditUserModal 
      <EditUserModal
        open={open}
        user={user?._id}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
      */}
    </>
  )
}
