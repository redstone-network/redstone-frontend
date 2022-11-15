import { Button, Form, Input } from 'antd'
import React from 'react'
import { getAccountInfo, setSlack } from '@/substrate'
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

  const onFinish = async (values: any) => {
    const { hook_url, message } = values
    setLoading(true)
    setDisabled(true)
    const res = await setSlack(hook_url, message)
    if (res) {
      message.info('set successfully!')
      setLoading(false)
      setShowMode(true)
      setDisabled(false)
    }
  }
  async function getInfo() {
    try {
      setLoading(true)
      setDisabled(true)
      const { Slack } = await getAccountInfo(AccountType.Slack)
      const [hook_url, message] = Slack
      form.setFieldsValue({
        hook_url,
        message,
      })
      setLoading(false)
      if (hook_url) {
        setShowMode(true)
      }
    } catch (err) {
      setLoading(false)
      setDisabled(false)
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div className="form-box">
      <div className="form-header">slack config</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        disabled={Disabled}
        autoComplete="off"
      >
        <Form.Item
          label="slack hook url"
          name="hook_url"
          rules={[{ required: true, message: 'Please input slack hook url!' }]}
        >
          <Input style={{ width: '80%' }} placeholder="Please input your slack hook url!" />
        </Form.Item>

        <Form.Item label="info" name="message" rules={[{ required: true, message: 'Please input info!' }]}>
          <Input style={{ width: '80%' }} placeholder="Please input info!" />
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
