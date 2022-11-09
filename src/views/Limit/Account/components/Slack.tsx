import { Button, Form, Input } from 'antd'
import React from 'react'
import { getAccountInfo, setSlack } from '@/substrate'
import { AccountType } from '@/substrate/enum'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [btnText, setBtnText] = useState<string>('Submit')

  const onFinish = async (values: any) => {
    const { hook_url, message } = values
    setBtnText('Loading')
    setLoading(true)
    setDisabled(true)
    const res = await setSlack(hook_url, message)
    if (res) {
      setLoading(false)
      setDisabled(false)
    }
  }
  async function getInfo() {
    try {
      const { Slack } = await getAccountInfo(AccountType.Slack)
      const [hook_url, message] = Slack
      form.setFieldsValue({
        hook_url,
        message,
      })
    } catch (err) {
      console.log(err)
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
          <Input style={{ width: '70%' }} placeholder="Please input your slack hook url!" />
        </Form.Item>

        <Form.Item label="info" name="message" rules={[{ required: true, message: 'Please input info!' }]}>
          <Input style={{ width: '70%' }} placeholder="Please input info!" />
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
