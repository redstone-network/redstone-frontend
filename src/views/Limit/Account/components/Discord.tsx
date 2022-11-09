import { Button, Form, Input, message } from 'antd'
import React, { useState, useCallback } from 'react'
import { getAccountInfo, setDiscord } from '@/substrate'
import { AccountType } from '@/substrate/enum'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [btnText, setBtnText] = useState<string>('Submit')

  async function getInfo() {
    try {
      const { Discord } = await getAccountInfo(AccountType.Discord)
      const [hook_url, user, content] = Discord
      form.setFieldsValue({
        hook_url,
        user,
        content,
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  const onFinish = async (values: any) => {
    const { hook_url, user, content } = values
    setBtnText('Loading')
    setLoading(true)
    setDisabled(true)
    const res = await setDiscord(hook_url, user, content)
    if (res) {
      setLoading(false)
      setDisabled(false)
    }
  }
  const onFinishFailed = useCallback(() => {
    message.destroy()
    message.info('place input the required fields')
  }, [])

  return (
    <div className="form-box">
      <div className="form-header">discord config</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
        disabled={Disabled}
        autoComplete="off"
      >
        <Form.Item
          label="discord hook url"
          name="hook_url"
          rules={[{ required: true, message: 'Please input discord hook url!' }]}
        >
          <Input style={{ width: '80%' }} placeholder="Please input your discord hook url!" />
        </Form.Item>

        <Form.Item label="user" name="user" rules={[{ required: true, message: 'Please input user!' }]}>
          <Input style={{ width: '80%' }} placeholder="Please input user!" />
        </Form.Item>

        <Form.Item label="content" name="content" rules={[{ required: true, message: 'Please input content!' }]}>
          <Input style={{ width: '80%' }} placeholder="Please input content!" />
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
