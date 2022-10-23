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
      <div className="form-header">hand proposal</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="approvel hash          "
          name="amount"
          rules={[{ required: true, message: 'Please input free time!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="alarmWay"
          label="approvel gap"
          rules={[{ required: true, message: 'Please select a alarm way !' }]}
        >
          <Select placeholder="Select a alarm way" allowClear onChange={handleChange}>
            <Option value="male">Deny</Option>
            <Option value="female">Agree</Option>
          </Select>
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
