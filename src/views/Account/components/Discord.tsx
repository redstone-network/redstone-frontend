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
      <div className="form-header">discord config</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="discord hook url"
          name="amount"
          rules={[{ required: true, message: 'Please input discord hook url!' }]}
        >
          <Input placeholder="Please input your discord hook url!" />
        </Form.Item>

        <Form.Item label="info" name="amount" rules={[{ required: true, message: 'Please input info!' }]}>
          <Input placeholder="Please input info!" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
