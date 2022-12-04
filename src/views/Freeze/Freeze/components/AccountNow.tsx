import { Button, Form, message } from 'antd'
import React, { useState } from 'react'
import { AccountFreeze } from '@/substrate'

const App: React.FC = () => {
  const freeText = 'freeze account directly'
  const [btnText, setBtnText] = useState(freeText)
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { freeze } = values
      setDisabled(true)
      setBtnText('Loading...')
      const setRes = await AccountFreeze(freeze)
      if (setRes) {
        setBtnText(freeText)
        setDisabled(false)
        message.info('Success!')
        return
      }
      message.error('Error!')
    } catch (error) {
      setBtnText(freeText)
      setDisabled(false)
      message.error('Error!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('place input the required fields!')
  }
  return (
    <div className="form-box">
      <div className="form-header">freeze account now</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        disabled={disabled}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {btnText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
