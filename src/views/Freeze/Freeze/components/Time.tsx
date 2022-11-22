import { Button, Form, message, Select } from 'antd'
import React, { useState } from 'react'
import { setFreezeTime, doFreeze } from '@/substrate'
const { Option } = Select

const App: React.FC = () => {
  const freeText = 'freeze time config'
  const [btnText, setBtnText] = useState('freeText')
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { seconds } = values
      const time = new Date().getTime()
      setDisabled(true)
      setBtnText('Loading...')
      const setRes = await setFreezeTime(time, seconds)
      if (setRes) {
        await doFreeze(true)
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
        <Form.Item label="free time" name="seconds" rules={[{ required: true, message: 'Please input free time!' }]}>
          <Select style={{ width: '80%' }} placeholder="Select free time" allowClear>
            <Option value={60}>1 minute</Option>
            <Option value={60 * 30}>30 minutes</Option>
            <Option value={60 * 60}>1 hour</Option>
            <Option value={60 * 60 * 2}>2 hours</Option>
            <Option value={60 * 60 * 3}>3 hours</Option>
            <Option value={60 * 60 * 6}>6 hours</Option>
            <Option value={60 * 60 * 12}>12 hours</Option>
            <Option value={60 * 60 * 24}>24 hours</Option>
            <Option value={60 * 60 * 48}>48 hours</Option>
            <Option value={60 * 60 * 72}>72 hours</Option>
            <Option value={60 * 60 * 24 * 7}>7 days</Option>
            <Option value={60 * 60 * 24 * 14}>14 days</Option>
            <Option value={60 * 60 * 24 * 30}>30 days</Option>
            <Option value={60 * 60 * 24 * 60}>60 days</Option>
            <Option value={60 * 60 * 24 * 90}>90 days</Option>
            <Option value={60 * 60 * 24 * 180}>180 days</Option>
            <Option value={60 * 60 * 24 * 260}>360 days</Option>
          </Select>
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
