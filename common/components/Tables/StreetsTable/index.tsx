import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons'
import {
  useDeleteStreetMutation,
  useGetStreetsQuery,
} from '@common/api/streetApi/street.api'
import { useGetCurrentUserQuery } from '@common/api/userApi/user.api'
import { TableProps } from '@common/components/Tables'
import { DomainsTable } from '@common/components/Tables/DomainsTable'
import { EditStreetButton } from '@common/components/UI/Buttons/EditStreetButton'
import { IStreet } from '@common/modules/models/Street'
import { Roles } from '@utils/constants'
import { Button, Popconfirm, Table, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface StreetsTableProps extends TableProps {
  domain?: string
}

export const StreetsTable: React.FC<StreetsTableProps> = ({
  domain: domainId,
  selected: _selected = [],
  onSelect,
  onDelete,
  editable = false,
  extended = false,
  expandable = false,
  filterable = false,
  selectable = false,
  ...props
}) => {
  const { data: user } = useGetCurrentUserQuery()

  const isGlobalAdmin = useMemo(() => {
    return user?.roles?.includes(Roles.GLOBAL_ADMIN)
  }, [user])
  const isDomainAdmin = useMemo(() => {
    return user?.roles?.includes(Roles.DOMAIN_ADMIN)
  }, [user])

  const [selected, setSelected] = useState<string[]>(_selected)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(filterable ? 10 : 5)
  const [filter, setFilter] = useState<Record<string, any>>({})

  const { data: streets, isLoading: isStreetsLoading } = useGetStreetsQuery({
    domainId,
    ...filter,
    limit: pageSize,
    skip: (page - 1) * pageSize,
  })
  const [deleteStreet] = useDeleteStreetMutation()

  const handleDelete = useCallback(
    async (id: string) => {
      const response = await deleteStreet(id)

      if ('data' in response) {
        message.success('Вулицю успішно видалено!')
        onDelete?.(response.data.id.toString())
      } else {
        message.error('При видаленні вулиці сталася помилка')
      }
    },
    [onDelete, deleteStreet]
  )

  const handlePagination = useCallback(
    (page: number, pageSize: number) => {
      setPage(page)
      setPageSize(pageSize)

      // TODO: not page related select
      setSelected([])
      onSelect?.([])
    },
    [onSelect]
  )

  const handleSelect = useCallback(
    (streets: string[]) => {
      setSelected(streets)
      onSelect?.(streets)
    },
    [onSelect]
  )

  useEffect(() => {
    setSelected(_selected || [])
  }, [_selected])

  const columns = useMemo(() => {
    return [
      {
        title: 'Місто',
        width: '25%',
        dataIndex: 'city',
        // BUG: Warning: [antd: Table] Columns should all contain `filteredValue` or not contain `filteredValue`.
        ...(filterable && {
          filterSearch: true,
          filters: streets?.filter.city,
          filteredValue: filter.city,
        }),
      },
      {
        title: 'Вулиця',
        dataIndex: 'address',
        // BUG: Warning: [antd: Table] Columns should all contain `filteredValue` or not contain `filteredValue`.
        ...(filterable && {
          filterSearch: true,
          filters: streets?.filter.address,
          filteredValue: filter.address,
        }),
      },
      {
        align: 'center',
        fixed: 'right',
        width: 64,
        render: (_, street: IStreet) => (
          <EditStreetButton street={street._id} editable={isGlobalAdmin}>
            {isGlobalAdmin ? <EditFilled /> : <EyeFilled />}
          </EditStreetButton>
        ),
        hidden: !editable,
      },
      {
        align: 'center',
        fixed: 'right',
        width: 64,
        render: (_, street: IStreet) => (
          <Popconfirm
            title="Ви впевнені що хочете видалити вулицю?"
            onConfirm={() => handleDelete(street._id)}
            placement="topLeft"
          >
            <Button type="dashed" danger>
              <DeleteFilled />
            </Button>
          </Popconfirm>
        ),
        hidden: !editable || !isGlobalAdmin,
      },
    ].filter((column) => !column.hidden)
  }, [editable, filterable, filter, handleDelete, isGlobalAdmin, streets])

  return (
    <Table
      rowKey="_id"
      size="small"
      pagination={
        filterable && {
          total: streets?.total,
          current: page,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: handlePagination,
        }
      }
      rowSelection={
        selectable && {
          fixed: 'left',
          type: 'checkbox',
          selectedRowKeys: selected,
          onChange: handleSelect,
        }
      }
      expandable={{
        rowExpandable: (record) => expandable,
        expandedRowRender: (record) => <DomainsTable streets={[record._id]} />,
      }}
      onChange={(_, filters) => setFilter(filters)}
      loading={isStreetsLoading}
      // BUG: antd v4.x issue, optional columns and columnsType fixed in antd v5.x
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns={columns}
      dataSource={streets?.data}
      scroll={{ x: 800 }}
      {...props}
    />
  )
}
