import {
  PlusOutlined,
  QuestionCircleOutlined,
  SelectOutlined,
} from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { IExtendedDomain } from '@common/api/domainApi/domain.api.types'
import AddDomainModal from '@components/UI/DomainsComponents/DomainModal'
import { AppRoutes } from '@utils/constants'
import { Roles } from '@utils/constants'
import { useGetCurrentUserQuery } from '@common/api/userApi/user.api'

export interface Props {
  currentDomain?: IExtendedDomain
  setCurrentDomain?: (domain: IExtendedDomain) => void
  setDomainActions: React.Dispatch<
    React.SetStateAction<{
      edit: boolean
    }>
  >
  domainActions: {
    edit: boolean
  }
}

const DomainsHeader: React.FC<Props> = ({
  currentDomain,
  setCurrentDomain,
  domainActions,
  setDomainActions,
}) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: userResponse } = useGetCurrentUserQuery()
  const isGlobalAdmin = userResponse?.roles?.includes(Roles.GLOBAL_ADMIN)

  const openModal = () => {
    setCurrentDomain(null)
    setDomainActions({ edit: true })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentDomain(null)
    setDomainActions({
      edit: false,
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button type="link" onClick={() => router.push(AppRoutes.DOMAIN)}>
        Надавачі послуг
        <SelectOutlined />
        <Tooltip title="Надавачі послуг - це організації та компанії, що здійснюють управління та мають під собою менші компанії та об'єкти нерухомості. Управляються адміністраторами">
          <QuestionCircleOutlined />
        </Tooltip>
      </Button>

      <>
        {isGlobalAdmin && (
          <Button type="link" onClick={openModal}>
            <PlusOutlined /> Додати
          </Button>
        )}
        {(isModalOpen || currentDomain) && (
          <AddDomainModal
            currentDomain={currentDomain}
            closeModal={closeModal}
            editable={domainActions.edit}
          />
        )}
      </>
    </div>
  )
}

export default DomainsHeader
