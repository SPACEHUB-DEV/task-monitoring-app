import MainLayout from '@common/components/Layouts/Main'
import PaymentBulkBlock from '@components/DashboardPage/blocks/paymentsBulk'
import withAuthRedirect from '@components/HOC/withAuthRedirect'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { AppRoutes } from '@utils/constants'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import Head from 'next/head'

export default withAuthRedirect(() => {
  return (
    <>
      <Head>
        <title>Створення платежів</title>
      </Head>

      <MainLayout
        path={[
          { title: 'Панель управління', path: AppRoutes.INDEX },
          { title: 'Платежі', path: AppRoutes.PAYMENT },
          { title: 'Створення рахунків', path: AppRoutes.PAYMENT_BULK },
        ]}
      >
        <PaymentBulkBlock />
      </MainLayout>
    </>
  )
})

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: AppRoutes.AUTH_SIGN_IN,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
