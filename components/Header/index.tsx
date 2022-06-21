import Link from "next/link"
import { Layout, Menu, Input } from 'antd'
import { selectUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import LoginUser from '../LoginUser';
import NavBarItem from "../UI/NavBarItem"
import s from './style.module.scss'





const MainHeader = () => {

  const onSearch = (value: string) => console.log(value)

  const menuItems = [
    {
      key: 'login',
      label: (
        <LoginUser />
      )
    }
  ]

  return (
    <Layout.Header className={s.Header}>
      <div className={s.Item}>

        <Link href='/'><h1 className={s.Logo}>LOGO</h1></Link>

        <Input.Search
          placeholder='input search text'
          onSearch={onSearch}
          enterButton
          className={s.Search} />
      </div>
      <Menu theme='light' mode='horizontal' items={menuItems} className={s.Menu} />
    </Layout.Header >
  )
}

export default MainHeader