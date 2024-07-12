import { Comment as CommentAntd } from '@ant-design/compatible'
import { useGetUserByIdQuery } from 'common/api/userApi/user.api'
import { IComment } from 'common/modules/models/Task'
import { useSession } from 'next-auth/react'
import { useGetUserByEmailQuery } from 'common/api/userApi/user.api'
import classNames from 'classnames'
import moment from 'moment'
import s from './style.module.scss'
import UserLink from '../UserLink'

const Comment: React.FC<{ comment: IComment; taskId: string }> = ({
  comment,
}) => {
  const session = useSession()
  const { data: sessionUser } = useGetUserByEmailQuery(
    session?.data?.user?.email
  )

  const { data } = useGetUserByIdQuery(comment.id)
  const user = data?.data

  return (
    <>
      <CommentAntd
        className={classNames(s.Comment, {
          [s.Active]: sessionUser?.data?._id === user?._id,
        })}
        author={user ? <UserLink user={user} /> : 'Власника не знайдено'}
        avatar={user?.image || undefined}
        content={<p className={s.Description}>{comment?.text}</p>}
        datetime={moment(comment?.datetime).fromNow()}
      />
    </>
  )
}

export default Comment
