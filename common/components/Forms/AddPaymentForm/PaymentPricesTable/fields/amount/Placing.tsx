import { QuestionCircleOutlined } from '@ant-design/icons'
import { IPaymentField } from '@common/api/paymentApi/payment.api.types'
import { usePaymentContext } from '@components/AddPaymentModal'
import { ServiceType } from '@utils/constants'
import { toRoundFixed } from '@utils/helpers'
import { Form, Tooltip } from 'antd'
import { useMemo } from 'react'

const Placing: React.FC<{
  record: IPaymentField & { key: string }
  preview?: boolean
}> = ({ record, preview }) => {
  const { form, company, prevPayment } = usePaymentContext()

  const invoice = Form.useWatch('invoice', form)
  const inflicion = useMemo(() => {
    const inflicionInvoice = invoice?.find(
      (inv: IPaymentField) => inv.type === ServiceType.Inflicion
    )
    return inflicionInvoice?.price || 0
  }, [invoice])

  if (company?.inflicion && prevPayment?.invoice) {
    const prevPlacing =
      prevPayment.invoice?.find(
        (invoice) => invoice.type === ServiceType.Placing
      )?.sum || 0

    const label = (
      <>
        {toRoundFixed(prevPlacing)} {(+inflicion || 0) < 0 ? '-' : '+'}{' '}
        {toRoundFixed(Math.abs(+inflicion || 0))}
      </>
    )

    if (preview) {
      return label
    }

    return (
      <Tooltip
        title={`Значення попереднього місяця + індекс інфляції в цьому рахунку`}
      >
        {label} <QuestionCircleOutlined />
      </Tooltip>
    )
  }
}

export default Placing
