import React from 'react'
import { Card, Radio } from 'antd'
import s from '../style.module.scss'
import { useGetAllRealEstateQuery } from '@common/api/realestateApi/realestate.api'

const MyCompany = () => {
  const { data: realEstate, isLoading } = useGetAllRealEstateQuery({})

  return (
    <Card loading={isLoading} size="small" title="Мої компанії">
      <Radio.Group>
        {realEstate?.data?.map((item) => (
          <Radio.Button
            className={s.companyName}
            value={item.companyName}
            key={item.companyName}
          >
            {item.companyName}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Card>
  )
}

export default MyCompany
