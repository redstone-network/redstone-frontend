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
      <div className="form-header">limit tx counts per 100 block config</div>
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
          label="limit tx counts per 100 block"
          name="amount"
          rules={[{ required: true, message: 'Please input limit tx counts per 100 block!' }]}
        >
          <Input placeholder="Please input your limit tx counts per 100 block!" />
        </Form.Item>

        <Form.Item
          name="alarmWay"
          label="alarm way"
          rules={[{ required: true, message: 'Please select a alarm way !' }]}
        >
          <Select placeholder="Select a alarm way" allowClear onChange={handleChange}>
            <Option value="male">male</Option>
            <Option value="female">slack</Option>
            <Option value="other">discord</Option>
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
