import { vote } from '@/substrate'
import { Button, Select, Form, Input, message } from 'antd'
import React, { useState } from 'react'

const { Option } = Select
const App: React.FC = () => {
  const [btnText, setBtnText] = useState('Submit')
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { proposal_id, voteNum } = values
      setDisabled(true)
      setBtnText('Loading...')
      const setRes = await vote(proposal_id, voteNum)
      if (setRes) {
        setBtnText('Submit')
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
      <div className="form-header">hand proposal</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        disabled={disabled}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="proposal id"
          name="proposal_id"
          rules={[{ required: true, message: 'Please input proposal id!' }]}
        >
          <Input placeholder="Select input proposal id" style={{ width: '80%' }} />
        </Form.Item>

        <Form.Item
          name="voteNum"
          label="proposal gap"
          rules={[{ required: true, message: 'Please select a alarm way !' }]}
        >
          <Select style={{ width: '80%' }} placeholder="Select a alarm way" allowClear>
            <Option value="1">Deny</Option>
            <Option value="0">Agree</Option>
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
