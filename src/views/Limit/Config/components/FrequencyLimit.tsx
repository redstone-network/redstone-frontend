import { getLimitInfo, setFrequencyLimit } from '@/substrate'
import { Button, Form, Input, InputNumber, message } from 'antd'
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
      const res = await getLimitInfo(2)
      const data = res?.FrequencyLimit ?? null
      if (data !== null) {
        const [amount, total] = data
        form.setFieldsValue({
          amount,
          total,
        })
        setShowMode(true)
        setLoading(false)
      } else {
        setLoading(false)
        setShowMode(false)
      }
    } catch (err) {
      setLoading(false)
      setShowMode(false)
      setDisabled(false)
      console.log(err)
    }
  }

  const onFinish = async (values: any) => {
    try {
      const { amount, total } = values
      setLoading(true)
      setDisabled(true)
      const res = await setFrequencyLimit(amount, total)
      console.log(res)
      if (res) {
        setShowMode(true)
        message.info('Success!')
      }
      setLoading(false)
      setDisabled(false)
    } catch (err) {
      setLoading(false)
      setDisabled(false)
      message.error('Error!')
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('please input the required fields!')
  }
  return (
    <div className="form-box">
      <div className="form-header">transfer frequency</div>
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
          label="block counts"
          name="total"
          rules={[{ required: true, message: 'Please input  block counts' }]}
        >
          <InputNumber min={0} style={{ width: '70%' }} placeholder="Please input  block counts" />
        </Form.Item>

        <Form.Item
          label="limit tx counts"
          name="amount"
          rules={[{ required: true, message: 'Please input limit tx counts' }]}
        >
          <InputNumber min={0} style={{ width: '70%' }} placeholder="Please input your limit tx counts" />
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
              <Button onClick={doEdit} loading={loading} type="primary">
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
