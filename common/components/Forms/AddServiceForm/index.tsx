import { IService } from '@common/api/serviceApi/service.api.types'
import { validateField } from '@common/assets/features/validators'
import AddressesSelect from '@common/components/UI/Reusable/AddressesSelect'
import DomainsSelect from '@common/components/UI/Reusable/DomainsSelect'
import useInitialValues from '@common/modules/hooks/useInitialValues'
import { DatePicker, Form, FormInstance, Input, InputNumber } from 'antd'
import { useEffect } from 'react'
import s from './style.module.scss'
import dayjs from 'dayjs'

interface Props {
  form: FormInstance<any>
  edit: boolean
  currentService: IService
}

const AddServiceForm: React.FC<Props> = ({ form, edit, currentService }) => {
  const { MonthPicker } = DatePicker
  const initialValues = useInitialValues(currentService)

  useEffect(() => {
    form.setFieldsValue({
      date: dayjs(),
    })
  }, [])

  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="vertical"
      className={s.Form}
    >
      {edit ? (
        <Form.Item name="domain" label="Надавач послуг">
          <Input disabled />
        </Form.Item>
      ) : (
        <DomainsSelect form={form} />
      )}
      {edit ? (
        <Form.Item name="street" label="Адреса">
          <Input disabled />
        </Form.Item>
      ) : (
        <AddressesSelect form={form} />
      )}
      <Form.Item
        name="date"
        label="Місяць та рік"
        rules={validateField('required')}
      >
        <MonthPicker
          format="MMMM YYYY"
          placeholder="Оберіть місяць"
          className={s.formInput}
        />
      </Form.Item>
      <Form.Item
        name="rentPrice"
        label="Утримання приміщень (грн/м²)"
        rules={validateField('required')}
      >
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item
        name="electricityPrice"
        label="Електроенергія (грн/кВт)"
        rules={validateField('electricityPrice')}
      >
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item
        name="waterPrice"
        label="Водопостачання (грн/м³)"
        rules={validateField('required')}
      >
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item
        name="waterPriceTotal"
        label="Всього водопостачання (грн/м³)"
        rules={validateField('required')}
      >
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item name="garbageCollectorPrice" label="Вивіз сміття">
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item name="inflicionPrice" label="Індекс інфляції">
        <InputNumber placeholder="Вкажіть значення" className={s.formInput} />
      </Form.Item>
      <Form.Item name="description" label="Опис">
        <Input.TextArea
          placeholder="Введіть опис"
          autoSize={{ minRows: 2, maxRows: 5 }}
          maxLength={256}
          className={s.formInput}
        />
      </Form.Item>
    </Form>
  )
}

export default AddServiceForm
