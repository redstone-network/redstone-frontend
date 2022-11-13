import { getLimitInfo, setTimesLimit } from '@/substrate'
import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [showMode, setShowMode] = useState<boolean>(true)
  const [form] = Form.useForm()

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
      const [, res] = await getLimitInfo(0)
      const amount = res?.TimesLimit?.[1] ?? null
      console.log(amount)
      if (amount !== null) {
        form.setFieldsValue({
          amount,
        })
        setShowMode(true)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      setShowMode(false)
      setDisabled(false)
      console.log(err)
    }
  }
  useEffect(() => {
    if (showMode) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [showMode])
  const onFinish = async (values: any) => {
    try {
      const { amount } = values
      const time = new Date().getTime()
      setLoading(true)
      setDisabled(true)
      const res = await setTimesLimit(time, amount)
      console.log(res)
      if (res) {
        setDisabled(true)
        message.info('set amount limit successfully!')
      }
      setLoading(false)
      setDisabled(false)
    } catch (err) {
      setLoading(false)
      setDisabled(false)
      setDisabled(false)
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
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        disabled={Disabled}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="limit tx counts per 100 block"
          name="amount"
          rules={[{ required: true, message: 'Please input limit tx counts per 100 block!' }]}
        >
          <Input style={{ width: '70%' }} placeholder="Please input your limit tx counts per 100 block!" />
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
