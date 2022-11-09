import { setTimesLimit } from '@/substrate'
import { Button, Form, Input, message } from 'antd'
import React from 'react'

const App: React.FC = () => {
  const [btnText, setBtnText] = useState('Submit')

  const onFinish = async (values: any) => {
    try {
      const { amount } = values
      const time = new Date().getTime()
      setBtnText('Loading')
      const res = await setTimesLimit(time, amount)
      console.log(res)
      if (res) {
        setBtnText('Edit')
        message.info('set amount limit successfully!')
      }
    } catch (err) {
      message.error('Error!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('please input the required fields!')
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
