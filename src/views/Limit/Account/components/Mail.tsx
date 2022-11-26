import { Button, Form, Input, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { setMail, getAccountInfo } from '@/substrate'
import { AccountType } from '@/substrate/enum'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [Disabled, setDisabled] = useState<boolean>(false)
  const [showMode, setShowMode] = useState<boolean>(true)
  async function getInfo() {
    try {
      setLoading(true)
      setDisabled(true)
      const { MailWithToken } = await getAccountInfo(AccountType.Mail)
      const [, , receiver, title, body] = MailWithToken
      form.setFieldsValue({
        receiver,
        title,
        body,
      })
      setLoading(false)
      if (receiver) {
        setShowMode(true)
      }
    } catch (err) {
      setLoading(false)
      setShowMode(false)
      console.log(err)
    }
  }
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
    try {
      const { receiver, title, body } = values
      console.log('ssss')
      setLoading(true)
      setDisabled(true)
      const res = await setMail(receiver, title, body)
      if (res) {
        setLoading(false)
        setShowMode(true)
        setDisabled(true)
        message.info('set successfully!')
      }
    } catch (err) {
      setLoading(false)
      setDisabled(false)
      console.log(err)
    }
  }

  return (
    <div className="form-box">
      <div className="form-header">mail config</div>
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
          label="mail receive"
          name="receiver"
          rules={[{ required: true, message: 'Please input your mail!' }]}
        >
          <Input style={{ width: '80%' }} placeholder="Please input your mail" />
        </Form.Item>
        <Form.Item label="title" name="title">
          <Input style={{ width: '80%' }} placeholder="Please input your title" />
        </Form.Item>
        <Form.Item label="body" name="body">
          <Input style={{ width: '80%' }} placeholder="Please input your body" />
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
