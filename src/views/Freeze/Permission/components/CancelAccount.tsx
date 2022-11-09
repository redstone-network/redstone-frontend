import { cancelGetAccountPermissions } from '@/substrate'
import { Button, Form, Input, message } from 'antd'
import React from 'react'

const App: React.FC = () => {
  const [btnText, setBtnText] = useState('Submit')
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { account } = values
      setDisabled(true)
      setBtnText('Loading...')
      const res = await cancelGetAccountPermissions(account)
      if (res) {
        message.info('Successful!')
      }
    } catch (err) {
      console.log(err)
      message.error('Error!')
    }
    setDisabled(false)
    setBtnText('Submit')
  }
  const onFinishFailed = function () {
    message.error('please input the required fields!')
  }
  return (
    <div className="form-box">
      <div className="form-header">cancel get account permission proposal</div>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        disabled={disabled}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="cancel permissions acout" name="amount" rules={[{ required: true }]}>
          <Input style={{ width: '80%' }} />
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
