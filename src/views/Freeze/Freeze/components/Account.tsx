import { Button, Form, message, Select } from 'antd'
import React, { useState } from 'react'
import { AccountFreeze } from '@/substrate'
const { Option } = Select

const App: React.FC = () => {
  const freeText = 'Submit'
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
      <div className="form-header">freeze account config</div>
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
        <Form.Item name="freeze" label="freeze account" rules={[{ required: true, message: 'Please select !' }]}>
          <Select style={{ width: '80%' }} placeholder="Please select" allowClear>
            <Option value={true}>freeze</Option>
            <Option value={false}>unfreeze</Option>
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
