import { Input } from 'antd'
import { useState } from 'react'

export const SearchBar = ({ className }) => {
  const [search, setSearch] = useState<string>('')
  const onSearch = (value: string) => setSearch(value)

  return (
    <Input.Search
      value={search}
      placeholder="input search text"
      onSearch={onSearch}
      enterButton
      className={className}
    />
  )
}
