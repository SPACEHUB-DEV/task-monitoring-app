import { PlacesAutocomplete } from '@components/PlacesAutocomplete'
import { IAddress } from '@modules/models/Task'
import { IUser } from '@modules/models/User'
import { Form, FormInstance } from 'antd'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import s from './index.module.scss'

type PropsType = {
  isLoaded: boolean
  error: boolean
  isFormDisabled: boolean
  form: FormInstance
  user: IUser
  setAddress: Dispatch<SetStateAction<IAddress>>
  setError: Dispatch<SetStateAction<boolean>>
  address: IAddress
}

const WorkerForm: React.FC<PropsType> = ({
  isFormDisabled,
  form,
  user,
  setAddress,
  isLoaded,
  error,
  setError,
}) => {
  const check = useCallback(() => {
    if (!user.address && Object.keys(user?.address).length <= 0) {
      setError(true)
    } else setError(false)
  }, [user?.address, setError])

  useEffect(() => {
    if (user?.address) {
      check()
    }
  }, [user?.address, check])

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
      disabled={isFormDisabled}
    >
      {!user?.address?.name ? (
        <Form.Item name="domain" label="Адреса">
          <PlacesAutocomplete
            isLoaded={isLoaded}
            setAddress={setAddress}
            error={error}
            placeholder="Введіть свою адресу"
          />
          <div className={`${s.default} ${error ? '' : s.error}`}>
            Введіть свою адресу, будь ласка!
          </div>
        </Form.Item>
      ) : (
        ''
      )}
    </Form>
  )
}
export default WorkerForm
