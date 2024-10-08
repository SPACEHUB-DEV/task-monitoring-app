import { Modal as AntModal, ButtonProps } from 'antd'
import s from './style.module.scss'

interface Props {
  children: React.ReactNode
  changed: () => boolean
  onCancel: () => void
  onOk: () => void
  okText?: string
  cancelText?: string
  confirmLoading?: boolean
  className?: string
  maskClickIgnore?: boolean
  style?: React.CSSProperties
  open?: boolean
  okButtonProps?: ButtonProps
  title: string
  preview?: boolean
}

const Modal: React.FC<Props> = ({
  children,
  changed,
  onCancel,
  onOk,
  okText,
  cancelText,
  confirmLoading,
  className,
  maskClickIgnore,
  style,
  title,
  okButtonProps,
  open = true,
  preview,
}) => {
  const [modal, context] = AntModal.useModal()

  const handleCancel = () => {
    if (changed()) {
      modal.confirm({
        title: 'Ви впевнені, що хочете вийти?',
        content: 'Всі незбережені дані будуть втрачені',
        okText: 'Так',
        cancelText: 'Ні',
        onOk: onCancel,
      })
    } else {
      onCancel()
    }
  }

  return (
    <>
      <AntModal
        confirmLoading={confirmLoading}
        open={open}
        maskClosable={!maskClickIgnore}
        title={title}
        onCancel={handleCancel}
        onOk={onOk}
        cancelText={cancelText}
        okText={okText}
        className={className ? className : s.Modal}
        style={style}
        okButtonProps={okButtonProps}
      >
        {children}
      </AntModal>
      {context}
    </>
  )
}

export default Modal
