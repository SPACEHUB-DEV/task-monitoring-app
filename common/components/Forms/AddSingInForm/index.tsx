import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message, Divider } from 'antd'
import { signIn } from 'next-auth/react'
import { Typography } from 'antd'
import { useState } from 'react'

const { Text, Link } = Typography

const SignInForm = ({ csrfToken }: { csrfToken: string }) => {
  const [form] = Form.useForm()
  const [isLogin, setIsLogin] = useState(false)

  const handleSubmit = async (values: {
    name: string
    email: string
    password: string
    authType: string
  }) => {
    const result = await signIn('credentials', {
      redirect: true,
      name: values?.name,
      email: values?.email,
      password: values?.password,
      authType: isLogin ? 'registration' : 'signIn',
      csrfToken: csrfToken,
    })
    if (result?.error) {
      message.error(result?.error)
    } else {
      message.success('Успішний вхід')
    }
  }

  return (
    <div style={{ maxWidth: 345, margin: '0 auto', padding: '15px' }}>
      {/* TODO: create title for reg & log <Title level={1}>
        {isLogin ? config.titles.signInTitle : config.titles.signUpTitle}
      </Title>  */}
      <Form
        form={form}
        name="signin"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ email: '', password: '' }}
      >
        {isLogin && (
          <Form.Item
            label="Ім'я"
            name="name"
            rules={[{ required: true, message: `Введіть ваше ім'я!` }]}
          >
            <Input
              data-e2e="sauthFormName"
              placeholder="name"
              prefix={<UserOutlined style={{ color: '#00000040' }} />}
            />
          </Form.Item>
        )}
        <Form.Item
          label="Пошта"
          name="email"
          rules={[
            { required: true, message: 'Введіть ваш email!' },
            { type: 'email', message: 'Введіть коректний email!' },
          ]}
        >
          <Input
            data-e2e="authFormEmail"
            type="text"
            placeholder="email"
            prefix={<MailOutlined style={{ color: '#00000040' }} />}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введіть ваш пароль!' }]}
        >
          <Input.Password
            data-e2e="authFormPassword"
            placeholder="******"
            prefix={<LockOutlined style={{ color: '#00000040' }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            data-e2e="authFormSubmit"
            type="primary"
            htmlType="submit"
            block
          >
            {isLogin ? 'Реєстрація' : 'Вхід'}
          </Button>
        </Form.Item>
        <span style={{ display: 'flex', gap: '1rem' }}>
          <Text>{isLogin ? 'Вже маєте акаунт?' : 'Немаєте акаунту?'}</Text>
          <Link onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Ввійти' : 'Зареєструватись'}
          </Link>
        </span>

        <Divider>or</Divider>
      </Form>
    </div>
  )
}

export default SignInForm
