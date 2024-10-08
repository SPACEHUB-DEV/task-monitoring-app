import MainLayout from '@common/components/Layouts/Main'
import ServicesBlock from '@components/DashboardPage/blocks/services'
import withAuthRedirect from '@components/HOC/withAuthRedirect'
import { AppRoutes } from '@utils/constants'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import Head from 'next/head'

export default withAuthRedirect(() => {
  return (
    <>
      <Head>
        <title>Послуги</title>
      </Head>
      <MainLayout
        path={[
          { title: 'Панель управління', path: AppRoutes.INDEX },
          { title: 'Послуги', path: AppRoutes.SERVICE },
        ]}
      >
        <ServicesBlock />
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
