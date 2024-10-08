import { validateField } from '@assets/features/validators'
import EmailSelect from '@components/UI/Reusable/EmailSelect'
import { Form, FormInstance, Input, Select, Space } from 'antd'
import { FC } from 'react'
import DomainStreets from './DomainStreets'
import s from './style.module.scss'
import DomainInfo from './DomainInfo'
import DomainsServices from './DomainsServices'

interface Props {
  form: FormInstance<any>
  editable?: boolean
  setIsValueChanged: (value: boolean) => void
}

const DomainForm: FC<Props> = ({
  form,
  editable = true,
  setIsValueChanged,
}) => {
  return (
    <Form
      form={form}
      requiredMark={editable}
      layout="vertical"
      className={s.Form}
      onValuesChange={() => setIsValueChanged(true)}
    >
      <Form.Item name="name" label="Назва" rules={validateField('required')}>
        <Input
          placeholder="Вкажіть значення"
          maxLength={256}
          className={s.formInput}
          disabled={!editable}
        />
      </Form.Item>
      <EmailSelect form={form} disabled={!editable} />
      <DomainStreets disabled={!editable} />
      <DomainsServices editable={editable} />
      <DomainInfo editable={editable} form={form} />
    </Form>
  )
}

export default DomainForm
