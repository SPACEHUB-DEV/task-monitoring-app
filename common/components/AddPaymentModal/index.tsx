/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAddPaymentMutation } from '@common/api/paymentApi/payment.api'
import {
  IExtendedPayment,
  IPayment,
} from '@common/api/paymentApi/payment.api.types'
import { Form, message, Modal, Tabs, TabsProps } from 'antd'
import React, { FC, useState } from 'react'
import AddPaymentForm from '../Forms/AddPaymentForm'
import ReceiptForm from '../Forms/ReceiptForm'
import s from './style.module.scss'
import { Operations, ServiceType } from '@utils/constants'

interface Props {
  closeModal: VoidFunction
  paymentData?: object
  edit?: boolean
}

const AddPaymentModal: FC<Props> = ({ closeModal, paymentData, edit }) => {
  const [form] = Form.useForm()
  const [addPayment, { isLoading }] = useAddPaymentMutation()
  const [currPayment, setCurrPayment] = useState<IExtendedPayment>()

  const [activeTabKey, setActiveTabKey] = useState(
    getActiveTab(paymentData, edit)
  )

  const handleSubmit = async () => {
    const formData = await form.validateFields()
    const response = await addPayment({
      type: formData.credit ? Operations.Credit : Operations.Debit,
      date: new Date(),
      domain: formData.domain,
      street: formData.street,
      company: formData.company,
      monthService: formData.monthService,
      generalSum:
        formData.maintenancePrice.sum +
        formData.placingPrice.sum +
        formData.electricityPrice.sum +
        formData.waterPrice.sum,
      invoice: [
        {
          type: ServiceType.Maintenance,
          amount: formData.maintenancePrice.amount,
          price: formData.maintenancePrice.price,
          sum: formData.maintenancePrice.sum,
        },
        {
          type: ServiceType.Placing,
          amount: formData.placingPrice.amount,
          price: formData.placingPrice.price,
          sum: formData.placingPrice.sum,
        },
        {
          type: ServiceType.Electricity,
          lastAmount: formData.electricityPrice.lastAmount,
          amount: formData.electricityPrice.amount,
          price: formData.electricityPrice.price,
          sum: formData.electricityPrice.sum,
        },
        {
          type: ServiceType.Water,
          lastAmount: formData.waterPrice.lastAmount,
          amount: formData.waterPrice.amount,
          price: formData.waterPrice.price,
          sum: formData.waterPrice.sum,
        },
      ],
    })

    if ('data' in response) {
      form.resetFields()
      message.success('Додано')
      closeModal()
    } else {
      message.error('Помилка при додаванні рахунку')
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Рахунок',
      children: (
        <AddPaymentForm form={form} edit={edit} paymentData={paymentData} />
      ),
    },
    {
      key: '2',
      label: 'Перегляд',
      // @ts-ignore
      disabled: !edit || !!paymentData?.credit,
      children: (
        <ReceiptForm currPayment={currPayment} paymentData={paymentData} />
      ),
    },
  ]

  return (
    <Modal
      open={true}
      maskClosable={false}
      title={!edit && 'Додавання рахунку'}
      onOk={
        activeTabKey === '1'
          ? () => {
              form.validateFields().then((values) => {
                if (values.operation === Operations.Credit) {
                  handleSubmit()
                } else {
                  setCurrPayment(values)
                  setActiveTabKey('2')
                }
              })
            }
          : handleSubmit
      }
      onCancel={() => {
        form.resetFields()
        closeModal()
      }}
      okText={!edit && 'Додати'}
      cancelText={edit ? 'Закрити' : 'Відміна'}
      confirmLoading={isLoading}
      className={s.Modal}
      style={{ top: 20 }}
    >
      <Tabs activeKey={activeTabKey} items={items} onChange={setActiveTabKey} />
    </Modal>
  )
}

function getActiveTab(paymentData, edit) {
  if (paymentData?.credit) return '1'
  return edit ? '2' : '1'
}

export default AddPaymentModal
