import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Popconfirm, Tooltip, FormInstance, Form } from 'antd'

import FormAttribute from '@common/components/UI/FormAttribute'
import { useInvoicesPaymentContext } from '@common/components/DashboardPage/blocks/paymentsBulk'
import useService from '@common/modules/hooks/useService'
import { useGetAllServicesQuery } from '@common/api/serviceApi/service.api'
import { useGetCurrentUserQuery } from '@common/api/userApi/user.api'
import { useGetAllPaymentsQuery } from '@common/api/paymentApi/payment.api'
import moment from 'moment'

export const getDefaultColumns = (
  service?: any,
  handleDelete?: (row: any) => void
): any[] => [
  {
    fixed: 'left',
    title: 'Компанія',
    dataIndex: 'companyName',
    width: 200,
    render: (value, record) => (
      <FormAttribute
        name={['companies', record.companyName, 'companyName']}
        value={value}
        disabled
      />
    ),
  },
  {
    title: 'Площа (м²)',
    dataIndex: 'totalArea',
    render: (value, record) => (
      <FormAttribute
        name={['companies', record.companyName, 'totalArea']}
        value={value}
        disabled
      />
    ),
  },
  {
    title: 'Утримання',
    children: [
      {
        title: 'За м²',
        dataIndex: 'servicePricePerMeter',
        render: (value, record) => (
          <>
            <FormAttribute
              name={[
                'companies',
                record.companyName,
                'maintenancePrice',
                'price',
              ]}
              value={value || service?.rentPrice}
            />

            {record.servicePricePerMeter && (
              <Tooltip title="Індивідуальне утримання, що передбачене договором">
                <QuestionCircleOutlined
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: 0,
                    transform: 'translate(-16px, -50%)',
                  }}
                />
              </Tooltip>
            )}
          </>
        ),
      },
      {
        title: 'Загальне',
        dataIndex: 'servicePriceSum',
        render: (__, record) => (
          <ServicePriceSum service={service} record={record} />
        ),
      },
    ],
  },
  {
    title: 'Розміщення',
    children: [
      {
        title: 'За м²',
        dataIndex: 'pricePerMeter',
        render: (value, record) => (
          <FormAttribute
            name={['companies', record.companyName, 'placingPrice', 'price']}
            value={value}
          />
        ),
      },
      {
        title: 'Загальне',
        dataIndex: 'priceSum',
        render: (__, record) => <PricePerMeterSum record={record} />,
      },
    ],
  },
  {
    title: service
      ? `Електрика: ${service.electricityPrice} грн/кВт`
      : 'Електрика',
    children: [
      {
        title: 'Стара',
        dataIndex: 'old_elec',
        render: (__, record) => <OldElectricity record={record} />,
      },
      {
        title: 'Нова',
        dataIndex: 'new_elec',
        render: (value, record) => (
          <FormAttribute
            name={[
              'companies',
              record.companyName,
              'electricityPrice',
              'amount',
            ]}
            value={value || 0}
          />
        ),
      },
      {
        title: 'Загальне',
        dataIndex: 'sum_elec',
        render: (__, record) => (
          <ElectricityPriceSum service={service} record={record} />
        ),
      },
    ],
  },
  {
    title: service ? `Вода: ${service.waterPrice} грн/м³` : 'Вода',
    children: [
      {
        title: 'Стара',
        dataIndex: 'old_water',
        render: (__, record) => <OldWater record={record} />,
      },
      {
        title: 'Нова',
        dataIndex: 'new_water',
        render: (value, record) => (
          <FormAttribute
            name={['companies', record.companyName, 'waterPrice', 'amount']}
            value={value || 0}
          />
        ),
      },
      {
        title: 'Загальне',
        dataIndex: 'sum_water',
        render: (__, record) => (
          <WaterPriceSum service={service} record={record} />
        ),
      },
    ],
  },
  {
    title: service ? (
      <>
        Вода (без лічильника)
        <br />
        Всього водопостачання: {service.waterPriceTotal}
      </>
    ) : (
      'Вода (без лічильника)'
    ),
    children: [
      {
        title: 'Частка постачання',
        dataIndex: 'waterPart',
        render: (value, record) => (
          <FormAttribute
            name={['companies', record.companyName, 'waterPart', 'price']}
            value={value}
          />
        ),
      },
      {
        title: 'Загальне',
        dataIndex: 'sum_waterPart',
        render: (__, record) => (
          <WaterPartSum service={service} record={record} />
        ),
      },
    ],
  },
  {
    title: 'Індекс інфляції',
    dataIndex: 'inflicionPrice',
    render: (value, record) => (
      <FormAttribute
        name={['companies', record.companyName, 'inflicionPrice']}
        value={value}
        disabled
      />
    ),
  },
  {
    title: 'ТПВ',
    dataIndex: 'garbageCollector',
    render: (value, record) => (
      <FormAttribute
        name={['companies', record.companyName, 'garbageCollector']}
        value={value || 0}
        disabled
      />
    ),
  },
  {
    title: 'Знижка',
    dataIndex: 'discount',
    render: (value, record) => (
      <FormAttribute
        name={['companies', record.companyName, 'discount']}
        value={value}
      />
    ),
  },
  {
    fixed: 'right',
    align: 'center',
    width: 50,
    render: (_, record: { _id: string }) => (
      <Popconfirm
        title="Видалити запис?"
        onConfirm={() => handleDelete && handleDelete(record._id)}
      >
        <CloseCircleOutlined />
      </Popconfirm>
    ),
  },
]

const OldWater: React.FC<{ record: any }> = ({ record }) => {
  const baseName = ['companies', record.companyName, 'waterPrice']

  const waterPriceName = [...baseName, 'lastAmount']

  // TODO: get correct payment
  const { data: paymentsResponse } = useGetAllPaymentsQuery({
    domainIds: record.domain._id,
    companyIds: record._id,
    limit: 1,
  })
  const invoice = paymentsResponse?.data?.[0]?.invoice
  const waterPrice = invoice?.find((item) => item.type === 'waterPrice')

  return (
    <FormAttribute
      disabled
      name={waterPriceName}
      value={waterPrice?.amount || 0}
    />
  )
}

const OldElectricity: React.FC<{ record: any }> = ({ record }) => {
  const baseName = ['companies', record.companyName, 'electricityPrice']

  const electricityPriceName = [...baseName, 'lastAmount']

  // TODO: get correct payment
  const { data: paymentsResponse } = useGetAllPaymentsQuery({
    domainIds: record.domain._id,
    companyIds: record._id,
    limit: 1,
  })
  const invoice = paymentsResponse?.data?.[0]?.invoice
  const electricityPrice = invoice?.find(
    (item) => item.type === 'electricityPrice'
  )

  return (
    <FormAttribute
      disabled
      name={electricityPriceName}
      value={electricityPrice?.amount || 0}
    />
  )
}

const PricePerMeterSum: React.FC<{ record: any }> = ({ record }) => {
  const { form } = useInvoicesPaymentContext()

  const baseName = ['companies', record.companyName, 'placingPrice']

  const pricePerMeterName = [...baseName, 'price']

  const pricePerMeter = Form.useWatch(pricePerMeterName, form)

  return (
    <FormAttribute
      disabled
      name={[...baseName, 'sum']}
      value={pricePerMeter * record.totalArea}
    />
  )
}

const WaterPartSum: React.FC<{ service: any; record: any }> = ({
  service,
  record,
}) => {
  const { form } = useInvoicesPaymentContext()

  const baseName = ['companies', record.companyName, 'waterPart']

  const waterPartName = [...baseName, 'price']

  const waterPart = Form.useWatch(waterPartName, form)

  return (
    <FormAttribute
      disabled
      name={[...baseName, 'sum']}
      value={waterPart * service?.waterPriceTotal}
    />
  )
}

const WaterPriceSum: React.FC<{ service: any; record: any }> = ({
  service,
  record,
}) => {
  const { form } = useInvoicesPaymentContext()

  const baseName = ['companies', record.companyName, 'waterPrice']

  const oldWaterName = [...baseName, 'lastAmount']
  const newWaterName = [...baseName, 'amount']

  const oldWater = Form.useWatch(oldWaterName, form)
  const newWater = Form.useWatch(newWaterName, form)

  return (
    <FormAttribute
      disabled
      name={[...baseName, 'sum']}
      value={(newWater - oldWater) * service?.waterPrice}
    />
  )
}

function ServicePriceSum({ service, record }) {
  const { form } = useInvoicesPaymentContext()
  const fieldName = [
    'companies',
    record.companyName,
    'maintenancePrice',
    'price',
  ]
  const servicePricePerMeter = Form.useWatch(fieldName, form)
  const prioPrice = servicePricePerMeter || service?.rentPrice

  return (
    <FormAttribute
      disabled
      name={['companies', record.companyName, 'maintenancePrice', 'sum']}
      value={prioPrice * record.totalArea}
    />
  )
}

function ElectricityPriceSum({ service, record }) {
  const { form } = useInvoicesPaymentContext()
  // TODO: we will get old value from last invoice later
  const newElecName = [
    'companies',
    record.companyName,
    'electricityPrice',
    'amount',
  ]
  const oldElecName = [
    'companies',
    record.companyName,
    'electricityPrice',
    'lastAmount',
  ]
  const newElec = Form.useWatch(newElecName, form)
  const oldElec = Form.useWatch(oldElecName, form)

  return (
    <FormAttribute
      name={['companies', record.companyName, 'electricityPrice', 'sum']}
      value={(newElec - oldElec) * service?.electricityPrice}
      disabled
    />
  )
}
