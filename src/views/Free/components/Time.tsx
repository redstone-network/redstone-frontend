import { Button, Form, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { setFreezeTime, doFreeze } from '@/substrate'

const App: React.FC = () => {
  const freeText = 'freeze current account'
  const [btnText, setBtnText] = useState('freeText')
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { seconds } = values
      const time = new Date().getTime()
      setDisabled(true)
      setBtnText('freezing...')
      const setRes = await setFreezeTime(time, seconds)
      if (setRes) {
        await doFreeze(true)
        setBtnText(freeText)
        setDisabled(false)
        return
      }
      message.error('Error!')
    } catch (error) {
      message.error('Error!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('place input the required fields!')
  }
  return (
    <div className="form-box">
      <div className="form-header">freeze time config</div>
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
        <Form.Item label="free time">
          <Form.Item name="seconds" rules={[{ required: true, message: 'Please input free time!' }]} noStyle>
            <InputNumber min={1} />
          </Form.Item>
          <span className="ant-form-text"> second</span>
        </Form.Item>

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
