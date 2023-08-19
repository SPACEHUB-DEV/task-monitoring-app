import React, { FC } from 'react'
import { validateField } from '@common/assets/features/validators'
import { Form, FormInstance, Input, InputNumber, Select } from 'antd'
import s from './style.module.scss'
import { Operations, ServiceType } from '@utils/constants'
import AddressesSelect from '@common/components/UI/Reusable/AddressesSelect'
import DomainsSelect from '@common/components/UI/Reusable/DomainsSelect'
import CompanySelect from './CompanySelect'
import PaymentTotal from './PaymentTotal'
import PaymentPricesTable from './PaymentPricesTable'
import MonthServiceSelect from './MonthServiceSelect'
import { usePaymentContext } from '@common/components/AddPaymentModal'
import moment from 'moment'
import InvoiceNumber from './InvoiceNumber'
import InvoiceCreationDate from './InvoiceCreationDate'
import { getFormattedDate } from '@utils/helpers'

interface Props {
  form: FormInstance<any>
  paymentData: any
  edit: boolean
  users?: any
}

const AddPaymentForm: FC<Props> = ({ edit }) => {
  const { form } = usePaymentContext()
  const initialValues = useInitialValues()

  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="vertical"
      className={s.Form}
    >
      {edit ? (
        <Form.Item name="domain" label="Домен">
          <Input disabled />
        </Form.Item>
      ) : (
        <DomainsSelect form={form} />
      )}

      {edit ? (
        <Form.Item name="street" label="Адреса">
          <Input disabled />
        </Form.Item>
      ) : (
        <AddressesSelect form={form} />
      )}

      {edit ? (
        <Form.Item name="monthService" label="Місяць">
          <Input disabled />
        </Form.Item>
      ) : (
        <MonthServiceSelect form={form} />
      )}

      {edit ? (
        <Form.Item name="company" label="Компанія">
          <Input disabled />
        </Form.Item>
      ) : (
        <CompanySelect form={form} />
      )}
      {/* TODO: disable, while we don't have company  */}
      <Form.Item
        name="operation"
        label="Тип оплати"
        rules={validateField('required')}
      >
        <Select
          placeholder="Оберіть тип оплати"
          className={s.Select}
          disabled={edit && true}
        >
          <Select.Option value={Operations.Credit}>
            Кредит (Оплата)
          </Select.Option>
          <Select.Option value={Operations.Debit}>
            Дебет (Реалізація)
          </Select.Option>
        </Select>
      </Form.Item>

      <InvoiceNumber form={form} edit={edit} />
      <InvoiceCreationDate edit={edit} />

      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.operation !== currentValues.operation
        }
        className={s.priceItem}
      >
        {({ getFieldValue }) =>
          getFieldValue('operation') === Operations.Credit ? (
            <>
              <Form.Item
                name="generalSum"
                label="Сума"
                rules={validateField('paymentPrice')}
              >
                <InputNumber
                  placeholder="Вкажіть суму"
                  disabled={edit}
                  className={s.inputNumber}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Опис"
                rules={validateField('required')}
              >
                <Input.TextArea
                  placeholder="Введіть опис"
                  maxLength={256}
                  disabled={edit && true}
                />
              </Form.Item>
            </>
          ) : (
            <>
              <PaymentPricesTable edit={edit} form={form} />
              <PaymentTotal form={form} />
            </>
          )
        }
      </Form.Item>
    </Form>
  )
}

function useInitialValues() {
  const { paymentData } = usePaymentContext()

  const invoices = {
    maintenance: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.Maintenance
    ),
    placing: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.Placing
    ),
    electricity: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.Electricity
    ),
    water: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.Water
    ),
    waterPart: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.WaterPart
    ),
    garbageCollector: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.GarbageCollector
    ),
    inflicion: paymentData?.invoice.find(
      (item) => item?.type === ServiceType.Inflicion
    ),
    custom: paymentData?.invoice.filter(
      (item) => item?.type === ServiceType.Custom
    ),
  }
  const customFields = invoices.custom?.reduce((acc, item) => {
    acc[item.name] = { price: item.price }
    return acc
  }, {})

  // TODO: add useEffect || useCallback ?
  // currently we have few renders
  // we need it only once. on didmount (first render)
  const initialValues = {
    domain: paymentData?.domain?.name,
    street:
      paymentData?.street &&
      `${paymentData.street.address} (м. ${paymentData.street.city})`,
    monthService: getFormattedDate(paymentData?.monthService?.date),
    company: paymentData?.company.companyName,
    description: paymentData?.description,
    credit: paymentData?.credit,
    generalSum: paymentData?.paymentData,
    debit: paymentData?.debit,
    invoiceNumber: paymentData?.invoiceNumber,
    invoiceCreationDate: moment(paymentData?.invoiceCreationDate),
    operation: paymentData ? paymentData.type : Operations.Credit,
    [ServiceType.Maintenance]: {
      amount: invoices.maintenance?.amount,
      price: invoices.maintenance?.price,
    },
    [ServiceType.Placing]: {
      amount: invoices.placing?.amount,
      price: invoices.placing?.price,
    },
    [ServiceType.Electricity]: {
      lastAmount: invoices.electricity?.lastAmount,
      amount: invoices.electricity?.amount,
      price: invoices.electricity?.price,
    },
    [ServiceType.Water]: {
      lastAmount: invoices.water?.lastAmount,
      amount: invoices.water?.amount,
      price: invoices.water?.price,
    },
    [ServiceType.WaterPart]: {
      price: invoices.waterPart?.price,
    },
    [ServiceType.GarbageCollector]: {
      price: invoices.garbageCollector?.price,
    },
    [ServiceType.Inflicion]: {
      price: invoices.inflicion?.price,
    },
    ...customFields,
  }
  return initialValues
}
export default AddPaymentForm
