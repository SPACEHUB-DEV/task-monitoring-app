import {
  useAddPaymentMutation,
  useGetPaymentsCountQuery,
} from '@common/api/paymentApi/payment.api'
import {
  IExtendedPayment,
  IProvider,
  IReciever,
} from '@common/api/paymentApi/payment.api.types'
import { Form, message, Modal, Tabs, TabsProps } from 'antd'
import React, { FC, createContext, useContext, useEffect, useState } from 'react'
import AddPaymentForm from '../Forms/AddPaymentForm'
import ReceiptForm from '../Forms/ReceiptForm'
import s from './style.module.scss'
import { Operations } from '@utils/constants'
import { FormInstance } from 'antd/es/form/Form'
import { useGetAllRealEstateQuery } from '@common/api/realestateApi/realestate.api'
import { filterInvoiceObject } from '@utils/helpers'
import useCompany from '@common/modules/hooks/useCompany'

interface Props {
  closeModal: VoidFunction
  paymentData?: object
  edit?: boolean
}

export const PaymentContext = createContext(
  {} as {
    paymentData: any
    form: FormInstance
  }
)
export const usePaymentContext = () => useContext(PaymentContext)

const AddPaymentModal: FC<Props> = ({ closeModal, paymentData, edit }) => {
  const [form] = Form.useForm()
  const [addPayment, { isLoading }] = useAddPaymentMutation()
  const [currPayment, setCurrPayment] = useState<IExtendedPayment>()
  const { data: count = 0 } = useGetPaymentsCountQuery(undefined, {
    skip: edit,
  })
  const [activeTabKey, setActiveTabKey] = useState(
    getActiveTab(paymentData, edit)
  )

  const companyId = Form.useWatch('company', form)
  const { company } = useCompany({ companyId, skip: !companyId })
  // console.log('companyId', companyId)
  // TODO: replace with correct request from backend by id
  // TODO: HOW TO SUBSCRIBE ON CORRECT realEstateId
  /*const { data: realEstate } = useGetAllRealEstateQuery(
    { domainId: currPayment?.domain as string, streetId: currPayment?.street },
    { skip: !currPayment?.street }
  )*/

  // TODO: bug here. if realestate by domain and by street have more than 1 item, always shows first realestate (company)
  // TODO: HOW TO SUBSCRIBE ON CORRECT domainId
  const provider: IProvider = company && {
    // TODO: after fixing useCompany - we will have correct domain info
    description: company?.domain?.description || '',
  }

  // TODO: after fixing useCompany - we will have correct company info
  const reciever: IReciever = company && {
    companyName: company?.companyName,
    adminEmails: company?.adminEmails,
    description: company?.description,
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('company', company)
  }, [company])

  const handleSubmit = async () => {
    const formData = await form.validateFields()
    const filteredInvoice = filterInvoiceObject(formData)

    const response = await addPayment({
      invoiceNumber: count + 1,
      type: formData.credit ? Operations.Credit : Operations.Debit,
      date: new Date(),
      domain: formData.domain,
      street: formData.street,
      company: formData.company,
      monthService: formData.monthService,
      description: formData.description || '',
      generalSum: filteredInvoice?.reduce((acc, val) => acc + val.sum, 0) || 0,
      provider,
      reciever,
      invoice: formData.debit ? filteredInvoice : [],
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
      disabled: !edit || !!(paymentData as unknown as any)?.credit,
      children: (
        <ReceiptForm currPayment={currPayment} paymentData={paymentData} />
      ),
    },
  ]

  return (
    <PaymentContext.Provider
      value={{
        paymentData,
        form,
      }}
    >
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
                    // eslint-disable-next-line no-console
                    console.log('values', values)
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
        <Tabs
          activeKey={activeTabKey}
          items={items}
          onChange={setActiveTabKey}
        />
      </Modal>
    </PaymentContext.Provider>
  )
}

function getActiveTab(paymentData, edit) {
  if (paymentData?.credit) return '1'
  return edit ? '2' : '1'
}

export default AddPaymentModal
