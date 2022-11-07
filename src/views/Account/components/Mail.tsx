import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { setMail } from '@/substrate'

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [btnText, setBtnText] = useState<string>('Submit')

  const onFinish = async (values: any) => {
    const { receiver, title, body } = values
    setBtnText('Loading')
    setLoading(true)
    setDisabled(true)
    const res = await setMail(receiver, title, body)
    if (res) {
      setLoading(false)
      setDisabled(false)
    }
  }

  return (
    <div className="form-box">
      <div className="form-header">mail config</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        disabled={Disabled}
        autoComplete="off"
      >
        <Form.Item
          label="mail receive"
          name="receiver"
          rules={[{ required: true, message: 'Please input your mail!' }]}
        >
          <Input placeholder="Please input your mail" />
        </Form.Item>
        <Form.Item label="title" name="title">
          <Input placeholder="Please input your title" />
        </Form.Item>
        <Form.Item label="body" name="body">
          <Input placeholder="Please input your body" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            {btnText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
