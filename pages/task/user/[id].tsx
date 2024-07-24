import { AppRoutes } from '@utils/constants'
import { Button } from 'antd'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { useGetAllTaskQuery } from '../../../common/api/taskApi/task.api'
import { useGetUserByEmailQuery } from '../../../common/api/userApi/user.api'
import AddTaskModal from '../../../common/components/AddTaskModal'
import Filter from '../../../common/components/UI/Filtration/index'
import { ITask } from '../../../common/modules/models/Task'
import { authOptions } from '../../api/auth/[...nextauth]'
import s from './../style.module.scss'

const UserTasks: React.FC = () => {
  const session = useSession()
  const userResponse = useGetUserByEmailQuery(session?.data?.user?.email)
  const user = userResponse?.data?.data
  const { data } = useGetAllTaskQuery('')
  const tasks: ITask[] = data?.data
  const [taskList, setTaskList] = useState(tasks)
  const [sorting, setSorting] = useState('')

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const dataSource = useMemo(() => {
    return tasks?.filter((task) => task?.creator === user?._id)
  }, [tasks, user?._id])

  return (
    <>
      <div className={s.Header}>
        <h1>Мої замовлення</h1>
        <Button
          ghost
          type="primary"
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          Створити замовлення
        </Button>
      </div>

      <Filter tasks={dataSource} />
      <AddTaskModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  )
}

export default UserTasks

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

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
