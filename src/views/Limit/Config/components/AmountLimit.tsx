import { Button, Form, Input, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { setAmountLimit, getLimitInfo } from '@/substrate'

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
      const res = await getLimitInfo(1)
      console.log(res)
      const amount = res?.AmountLimit ?? null
      if (amount !== null) {
        form.setFieldsValue({
          amount,
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
      setLoading(true)
      setDisabled(true)
      const { amount } = values
      const time = new Date().getTime()
      const res = await setAmountLimit(time, amount)
      if (res) {
        message.info('Success!')
        setShowMode(true)
      }
      setLoading(false)
      setDisabled(false)
    } catch (err) {
      console.log(err)
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
      <div className="form-header">max amount per tx</div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        disabled={Disabled}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="limit amount per tx"
          name="amount"
          rules={[{ required: true, message: 'Please input your amount per tx!' }]}
        >
          <Input style={{ width: '70%' }} placeholder="Please input your amount per tx!" />
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
