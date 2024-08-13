import { dateToMonthYear } from '@assets/features/formatDate'
import { usePaymentContext } from '@components/AddPaymentModal'
import { InvoiceComponentProps } from '@components/Tables/EditInvoiceTable'
import { ServiceType } from '@utils/constants'
import { toArray, toFirstUpperCase, toRoundFixed } from '@utils/helpers'
import validator from '@utils/validator'
import { Form, Input, Space, Typography } from 'antd'
import { useEffect, useMemo } from 'react'

export const Name: React.FC<InvoiceComponentProps> = ({
  form,
  name: _name,
  editable,
  disabled,
}) => {
  const { service, prevService } = usePaymentContext()

  return (
    <Space direction="vertical" size={0}>
      <Typography.Text>Інфляція</Typography.Text>
      <Typography.Text type="secondary">
        {prevService?.inflicionPrice > 100
          ? '(донарах. інд. інф.)'
          : '(незмінна)'}
      </Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: '0.75rem' }}>
        {toFirstUpperCase(dateToMonthYear(prevService?.date))}
      </Typography.Text>
    </Space>
  )
}

export const Amount: React.FC<InvoiceComponentProps> = ({
  form,
  name: _name,
  editable,
  disabled,
}) => {
  const { service, company, prevService, prevPayment } = usePaymentContext()

  if (company?.inflicion && prevService?.inflicionPrice) {
    const prevPlacingInvoice = prevPayment?.invoice.find(
      (invoice) => invoice.type === ServiceType.Placing
    )
    const rentPrice =
      prevPlacingInvoice?.sum ||
      company.totalArea * (company.pricePerMeter || prevService.rentPrice)

    return (
      <span>
        {toRoundFixed(Math.max(prevService.inflicionPrice - 100, 0))}% від{' '}
        {toRoundFixed(rentPrice)} грн
      </span>
    )
  }

  if (company?.inflicion && !prevService?.inflicionPrice) {
    return <>Інфляція за попередній місяць невідома</>
  }
}

export const Price: React.FC<InvoiceComponentProps> = ({
  form,
  name: _name,
  editable,
  disabled,
}) => {
  const name = useMemo(() => toArray<string>(_name), [_name])

  const price = Form.useWatch(['invoice', ...name, 'price'], form)

  if (!editable) {
    return <span>{toRoundFixed(price)} грн</span>
  }

  return (
    <Form.Item
      name={[...name, 'price']}
      rules={[validator.required(), validator.min(0)]}
      style={{ margin: 0 }}
    >
      <Input
        type="number"
        placeholder="Значення..."
        disabled={disabled}
        suffix="грн"
      />
    </Form.Item>
  )
}

export const Sum: React.FC<InvoiceComponentProps> = ({ form, name: _name }) => {
  const name = useMemo(() => toArray<string>(_name), [_name])

  const price = Form.useWatch(['invoice', ...name, 'price'], form)
  const sum = Form.useWatch(['invoice', ...name, 'sum'], form)

  useEffect(() => {
    form.setFieldValue(['invoice', ...name, 'sum'], +price)
  }, [form, name, price])

  return <strong>{toRoundFixed(sum)} грн</strong>
}

const Inflicion = {
  Name,
  Amount,
  Price,
  Sum,
}

export default Inflicion
