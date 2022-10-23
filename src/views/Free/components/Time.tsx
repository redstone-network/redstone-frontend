import { Button, Select, Form, Input } from 'antd'
import React from 'react'

const { Option } = Select
const App: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  return (
    <div className="form-box">
      <div className="form-header">freeze time config</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="free time" name="amount" rules={[{ required: true, message: 'Please input free time!' }]}>
          <Input placeholder="Please input free time" />
        </Form.Item>
        <Form.Item label="title" name="title">
          <Input placeholder="Please input your title" />
        </Form.Item>
        <Form.Item label="body" name="body">
          <Input placeholder="Please input your body" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            freeze current account
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App