import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { message, Modal } from 'antd'
import type { RootState } from '@store/index'
import { MehOutlined, CheckCircleTwoTone, CopyOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { setAccount } from '@store/account'
import { getUser } from '@/substrate'
import './AccountModel.less'
import * as copy from 'copy-to-clipboard'

const accountList = [
  { value: 'Alice', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Bob', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Charlie', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Dave', color: '#52c41a', bg: 'fde3cf' },
  { value: 'Eve', color: '#52c41a', bg: 'fde3cf' },
]
type porps = {
  open?: boolean
  changeModal: (value: boolean) => void
}
const Login: React.FunctionComponent<porps> = ({ open, changeModal }: porps) => {
  const storeAccount = useAppSelector((state: RootState) => state.account.value)
  const location = useLocation()
  console.log(location)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 设置account
  useEffect(() => {
    const accountInfoInSession = sessionStorage.getItem('accountInfo')
    if (accountInfoInSession && accountList.map((item) => item.value).includes(accountInfoInSession)) {
      dispatch(setAccount(accountInfoInSession))
    } else {
      changeModal(true)
    }
  }, [])
  // 改变account
  const changeAccount = function (account: string) {
    if (storeAccount !== account) {
      dispatch(setAccount(account))
      sessionStorage.setItem('accountInfo', account)
    }
    changeModal(false)

    if (location.pathname === '/') {
      navigate('/Limit')
    } else {
      window.location.reload()
    }
  }

  const onCancel = () => {
    if (storeAccount) {
      changeModal(false)
    } else {
      message.info('place change an account')
    }
  }
  const handleCopy = (e: Event, value: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (copy(value)) {
      message.success('复制成功')
    } else message.error('复制失败')
  }
  return (
    <Modal width={600} title="change account" footer={null} centered onCancel={onCancel} open={open}>
      {accountList.map((item) => {
        return (
          <p
            onClick={() => changeAccount(item.value)}
            className={`accountItem ${storeAccount === item.value ? 'active' : ''}`}
            key={item.value}
          >
            {storeAccount === item.value ? (
              <CheckCircleTwoTone className="itemIcon" twoToneColor="#52c41a" />
            ) : (
              <MehOutlined className="itemIcon" />
            )}
            {item.value.toUpperCase()}
            <span className="ids">{getUser(item.value).address}</span>
            <CopyOutlined className="copyIcon" onClick={(e) => handleCopy(e, getUser(item.value).address)} />
          </p>
        )
      })}
    </Modal>
  )
}
export default Login
