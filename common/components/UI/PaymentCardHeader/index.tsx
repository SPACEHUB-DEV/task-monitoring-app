import {
  PlusOutlined,
  SelectOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import { AppRoutes, Roles } from '@utils/constants'
import { Button, Table, message } from 'antd'
import { useRouter } from 'next/router'
import AddPaymentModal from '@common/components/AddPaymentModal'
import { useGetCurrentUserQuery } from '@common/api/userApi/user.api'
import s from './style.module.scss'
import { isAdminCheck } from '@utils/helpers'
import PaymentCascader from '@common/components/UI/PaymentCascader/index'
import FilterTags from '../Reusable/FilterTags'
import ImportInvoices from './ImportInvoices'
import {
  useDeleteMultiplePaymentsMutation,
  useGeneratePdfMutation,
} from '@common/api/paymentApi/payment.api'
import Modal from 'antd/lib/modal/Modal'
import { dateToDefaultFormat } from '@common/assets/features/formatDate'
import { saveAs } from 'file-saver'
import SelectForDebitAndCredit from '@components/UI/PaymentSelect/index'
import StreetsSelector from '@components/StreetsSelector'

const columns: any = [
  {
    title: 'Надавач поcлуг',
    dataIndex: 'domain',
  },
  {
    title: 'Компанія',
    dataIndex: 'company',
  },
  {
    title: 'Дата створення платежу',
    dataIndex: 'date',
    render: dateToDefaultFormat,
  },
]

const PaymentCardHeader = ({
  setCurrentDateFilter,
  setCurrentTypeOperation,
  currentPayment,
  paymentActions,
  closeEditModal,
  paymentsDeleteItems,
  payments,
  streets,
  filters,
  setFilters,
  selectedPayments,
  setPaymentsDeleteItems,
  setSelectedPayments,
}) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: currUser } = useGetCurrentUserQuery()

  const {
    pathname,
    query: { email },
  } = router

  const closeModal = () => {
    setIsModalOpen(false)
    closeEditModal()
  }

  const isGlobalAdmin = currUser?.roles?.includes(Roles.GLOBAL_ADMIN)
  const isAdmin = isAdminCheck(currUser?.roles)
  const [deletePayment] = useDeleteMultiplePaymentsMutation()

  const handleDeletePayments = async () => {
    ;(Modal as any).confirm({
      title: 'Ви впевнені, що хочете видалити обрані проплати?',
      cancelText: 'Ні',
      okText: 'Так',
      content: (
        <>
          {paymentsDeleteItems.map((item, index) => (
            <div key={index}>
              {index + 1}. {item.domain}, {item.company},{' '}
              {dateToDefaultFormat(item.date)}
            </div>
          ))}
        </>
      ),
      onOk: async () => {
        const response = await deletePayment(
          paymentsDeleteItems.map((item) => item.id)
        )
        if ('data' in response) {
          setPaymentsDeleteItems([])
          setSelectedPayments([])
          message.success('Видалено!')
        } else {
          message.error('Помилка при видаленні рахунків')
        }
      },
    })
  }

  const [generatePdf] = useGeneratePdfMutation()

  const handleGeneratePdf = async () => {
    try {
      const response = await generatePdf({
        payments: selectedPayments,
      })

      if ('data' in response) {
        const { data } = response

        if (data) {
          const buffer = Buffer.from(data.buffer)
          const blob = new Blob([buffer], {
            type: `application/${data.fileExtension}`,
          })

          saveAs(blob, `${data.fileName}.${data.fileExtension}`)
        }
      } else {
        message.error('Сталася помилка під час генерації PDF')
      }
    } catch (error) {
      message.error('Сталася несподівана помилка під час генерації PDF')
    }
  }

  return (
    <>
      <div className={s.tableHeader}>
        {isAdmin ? (
          <>
            {email ? (
              <span
                className={s.title}
              >{`Оплата від користувача ${email}`}</span>
            ) : (
              <div className={s.firstBlock}>
                <Button
                  type="link"
                  onClick={() => router.push(AppRoutes.PAYMENT)}
                >
                  Платежі
                  <SelectOutlined className={s.Icon} />
                </Button>
                {location.pathname === AppRoutes.PAYMENT && (
                  <>
                    <PaymentCascader onChange={setCurrentDateFilter} />
                    <SelectForDebitAndCredit
                      onChange={setCurrentTypeOperation}
                    />
                    <StreetsSelector
                      filters={filters}
                      setFilters={setFilters}
                      streets={streets}
                    />
                    <FilterTags
                      filters={filters}
                      setFilters={setFilters}
                      collection={payments}
                    />
                  </>
                )}
              </div>
            )}
            <div className={s.secondBlock}>
              <ImportInvoices />
              <Button
                type="link"
                onClick={() => router.push(AppRoutes.PAYMENT_BULK)}
              >
                Інвойси <SelectOutlined className={s.Icon} />
              </Button>
              <Button type="link" onClick={() => setIsModalOpen(true)}>
                <PlusOutlined /> Додати
              </Button>
              {isAdmin &&
                pathname === AppRoutes.PAYMENT &&
                selectedPayments.length > 0 && (
                  <Button type="link" onClick={() => handleGeneratePdf()}>
                    Завантажити рахунки <DownloadOutlined />
                  </Button>
                )}
              {isGlobalAdmin &&
                pathname === AppRoutes.PAYMENT &&
                selectedPayments.length > 0 && (
                  <Button type="link" onClick={() => handleDeletePayments()}>
                    <DeleteOutlined /> Видалити
                  </Button>
                )}
            </div>
          </>
        ) : (
          currUser && (
            <Button
              className={s.myPayments}
              type="link"
              onClick={() => router.push(AppRoutes.PAYMENT)}
            >
              Мої оплати
              <SelectOutlined className={s.Icon} />
            </Button>
          )
        )}
      </div>
      {(isModalOpen || currentPayment) && (
        <AddPaymentModal
          paymentActions={paymentActions}
          paymentData={currentPayment}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default PaymentCardHeader
