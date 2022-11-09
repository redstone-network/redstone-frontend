import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { createCaptureConfig } from '@/substrate'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}

const App: React.FC = () => {
  const [btnText, setBtnText] = useState('Submit')
  const [disabled, setDisabled] = useState(false)

  const onFinish = async (values: any) => {
    try {
      const { names, Threshold } = values
      setDisabled(true)
      setBtnText('Loading...')
      const res = await createCaptureConfig(names, Threshold)
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

  return (
    <div className="form-box">
      <div className="form-header">set account permission memberList</div>
      <Form
        name="dynamic_form_item"
        disabled={disabled}
        labelWrap={true}
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
      >
        <Form.List
          name="names"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error('At least 2 number'))
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'permissions member list' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input permissions',
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="permissions" style={{ width: '60%', marginRight: '10px' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                  Add Account
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          {...formItemLayout}
          rules={[{ required: true, message: 'Please input Threshold' }]}
          name="Threshold"
          label="Threshold"
        >
          <InputNumber style={{ width: '60%', marginRight: '10px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {btnText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
