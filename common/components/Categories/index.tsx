import React, { useState, useEffect } from 'react'
import { Button, List, Skeleton } from 'antd'
import Link from 'next/link'
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from 'common/api/categoriesApi/category.api'
import { AppRoutes, Roles } from 'utils/constants'
import { useSession } from 'next-auth/react'
import { useGetUserByEmailQuery } from 'common/api/userApi/user.api'
import DeleteButton from '../UI/Buttons/DeleteButton'
import s from './style.module.scss'
import { EditButton } from '../UI/Buttons'

const Categories: React.FC<{
  nameFilter: string
  handleEdit: (id: string) => void
}> = ({ nameFilter, handleEdit }) => {
  const { data: categoriesData } = useGetAllCategoriesQuery('')

  const [categories, setCategories] = useState(categoriesData?.data)

  const [deleteCategory] = useDeleteCategoryMutation()

  const { data: session } = useSession()
  const { data } = useGetUserByEmailQuery(`${session?.user?.email}`)
  const roles = data?.data?.roles

  useEffect(() => {
    setCategories(
      categoriesData?.data.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    )
  }, [nameFilter, categoriesData])

  return (
    <List
      itemLayout="horizontal"
      dataSource={categories}
      renderItem={(category) => (
        <List.Item
          className={s.Category}
          actions={
            //   [
            //   <Button
            //     className={s.Buttons}
            //     key="info"
            //     type="primary"
            //     onClick={() => ''}
            //   >
            //     Інформація
            //   </Button>,
            // ].concat(
            roles?.includes(Roles.GLOBAL_ADMIN)
              ? [
                  <DeleteButton
                    key="delete"
                    onDelete={() => deleteCategory(category._id)}
                  />,
                  <EditButton
                    key="edit"
                    onClick={() => handleEdit(category._id)}
                  />,
                ]
              : []
            // )
          }
        >
          <Skeleton title={false} loading={false} active>
            <List.Item.Meta
              title={category?.name}
              description={category?.description}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default Categories
