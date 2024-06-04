import { DeleteFilled, EditFilled, EyeFilled } from '@ant-design/icons'
import {
  useDeleteDomainMutation,
  useGetDomainsQuery,
} from '@common/api/domainApi/domain.api'
import { useGetCurrentUserQuery } from '@common/api/userApi/user.api'
import { TableProps } from '@common/components/Tables'
import { EditDomainButton } from '@common/components/UI/Buttons/EditDomainButton'
import { IDomain } from '@common/modules/models/Domain'
import { IStreet } from '@common/modules/models/Street'
import { Roles } from '@utils/constants'
import { Button, Popconfirm, Table, Tag, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface DomainsTableProps extends TableProps {
  streets?: IStreet['_id'][]
}

export const DomainsTable: React.FC<DomainsTableProps> = ({
  streets: streetsIds,
  selected: _selected = [],
  onSelect,
  onDelete,
  editable = false,
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
  const [pageSize, setPageSize] = useState<number>(editable ? 10 : 5)
  const [filter, setFilter] = useState<Record<string, any>>({
    streets: streetsIds || null,
  })

  const { data: domains, isLoading: isDomainsLoading } = useGetDomainsQuery({
    name: filter.name,
    streetId: filter.streets,
    adminEmail: filter.adminEmails,
    limit: pageSize,
    skip: (page - 1) * pageSize,
  })
  const [deleteDomain] = useDeleteDomainMutation()

  const handleDelete = useCallback(
    async (id: string) => {
      const response = await deleteDomain(id)

      if ('data' in response) {
        message.success('Надавача послуг успішно видалено!')
        onDelete?.(response.data.id.toString())
      } else {
        message.error('При видаленні надавача послуг сталася помилка')
      }
    },
    [onDelete, deleteDomain]
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
    (domains: string[]) => {
      setSelected(domains)
      onSelect?.(domains)
    },
    [onSelect]
  )

  useEffect(() => {
    setSelected(_selected)
  }, [_selected])

  const columns = useMemo(() => {
    return [
      {
        title: 'Надавач послуг',
        width: '250px',
        dataIndex: 'name',
        filterSearch: editable,
        filters: editable ? domains?.filter.name : null,
        filteredValue: editable ? filter.name : null,
      },
      {
        title: 'Вулиці',
        dataIndex: 'streets',
        render: (streets: IStreet[]) => (
          <>
            {streets.map((street) => (
              <Tag key={street._id}>
                вул. {street.address} (м. {street.city})
              </Tag>
            ))}
          </>
        ),
        filterSearch: editable,
        filters: editable ? domains?.filter.streets : null,
        filteredValue: editable ? filter.streets : null,
      },
      {
        title: 'Представники',
        dataIndex: 'adminEmails',
        render: (adminEmails: string[]) => (
          <>
            {adminEmails.map((adminEmail, index) => (
              <Tag key={index}>{adminEmail}</Tag>
            ))}
          </>
        ),
        filterSearch: editable,
        filters: editable ? domains?.filter.adminEmails : null,
        filteredValue: editable ? filter.adminEmails : null,
      },
      {
        align: 'center',
        fixed: 'right',
        width: 64,
        render: (_, domain: IDomain) => (
          <EditDomainButton
            domain={domain._id}
            editable={editable && (isDomainAdmin || isGlobalAdmin)}
          >
            {isDomainAdmin || isGlobalAdmin ? <EditFilled /> : <EyeFilled />}
          </EditDomainButton>
        ),
        hidden: !editable || (!isDomainAdmin && !isGlobalAdmin),
      },
      {
        align: 'center',
        fixed: 'right',
        width: 64,
        render: (_, domain: IDomain) => (
          <Popconfirm
            title="Ви впевнені що хочете видалити надавача послуг?"
            onConfirm={() => handleDelete(domain._id)}
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
  }, [editable, filter, handleDelete, isDomainAdmin, isGlobalAdmin, domains])

  return (
    <Table
      rowKey="_id"
      size="small"
      pagination={
        editable && {
          total: domains?.total,
          current: page,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50],
          onChange: handlePagination,
        }
      }
      rowSelection={
        editable && {
          fixed: 'left',
          type: 'checkbox',
          selectedRowKeys: selected,
          onChange: handleSelect,
        }
      }
      expandable={
        editable &&
        {
          // TODO: update domains table to pass `domain?: IDomain['_id]` into props and render THIS domain domains
          // expandedRowRender: (domain) => <DomainsTable domain={domain._id} />,
        }
      }
      onChange={(_, filters) => setFilter(filters)}
      loading={isDomainsLoading}
      // BUG: antd v4.x issue, optional columns and columnsType fixed in antd v5.x
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns={columns}
      dataSource={domains?.data}
      scroll={{ x: 1200 }}
      {...props}
    />
  )
}
