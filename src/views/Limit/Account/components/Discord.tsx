import { Button, Form, Input, message } from 'antd'
import React, { useState, useCallback } from 'react'
import { getAccountInfo, setDiscord } from '@/substrate'
import { AccountType } from '@/substrate/enum'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [showMode, setShowMode] = useState<boolean>(true)

  const doEdit = () => {
    setShowMode(false)
  }
  useEffect(() => {
    getInfo()
  }, [])
  useEffect(() => {
    if (showMode) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [showMode])
  async function getInfo() {
    try {
      setLoading(true)
      setDisabled(true)
      const { Discord } = await getAccountInfo(AccountType.Discord)
      const [hook_url, user, content] = Discord
      form.setFieldsValue({
        hook_url,
        user,
        content,
      })
      setLoading(false)
      if (hook_url) {
        setShowMode(true)
      }
    } catch (err) {
      setLoading(false)
      setDisabled(false)
      console.log(err)
    }
  }
  const onFinish = async (values: any) => {
    const { hook_url, user, content } = values
    setLoading(true)
    setDisabled(true)
    const res = await setDiscord(hook_url, user, content)
    if (res) {
      setLoading(false)
      setShowMode(true)
      setDisabled(false)
      message.info('set successfully!')
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

        {showMode ? null : (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              {loading ? 'Loading' : 'Submit'}
            </Button>
          </Form.Item>
        )}
      </Form>
      {showMode ? (
        <div>
          <Form>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={doEdit} loading={loading} type="primary" htmlType="submit">
                Edit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default App
