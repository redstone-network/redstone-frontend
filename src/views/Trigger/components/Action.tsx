import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'
import React from 'react'

const Action = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Create Action"
      getContainer={false}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.error('Validate Failed:', info)
          })
      }}
    >
      <Form
        name="ActionForm"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ actionType: '' }}
        autoComplete="off"
        style={{ padding: '20px' }}
      >
        <Form.Item
          label="Action Type"
          name="actionType"
          rules={[{ required: true, message: 'Please input your action type!' }]}
        >
          <Select placeholder="Select a action type">
            <Select.Option value="MailWithToken">MailWithAsset</Select.Option>
            <Select.Option value="Oracle">Oracle</Select.Option>
            <Select.Option value="BuyToken">BuyAsset</Select.Option>
            <Select.Option value="Slack">Slack</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.actionType !== currentValues.actionType}
        >
          {({ getFieldValue }) => {
            const actionType = getFieldValue('actionType')
            if (actionType === 'MailWithToken') {
              return (
                <>
                  <Form.Item label="Url" name="url" rules={[{ required: true, message: 'Please input your url!' }]}>
                    <Input placeholder="Url" />
                  </Form.Item>

                  <Form.Item
                    label="Asset"
                    name="token"
                    rules={[{ required: true, message: 'Please input your token!' }]}
                  >
                    <Input placeholder="token" />
                  </Form.Item>

                  <Form.Item
                    label="Receiver"
                    name="receiver"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your receiver!',
                      },
                    ]}
                  >
                    <Input placeholder="receiver" />
                  </Form.Item>

                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                  >
                    <Input placeholder="title" />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="body"
                    rules={[{ required: true, message: 'Please input your body!' }]}
                  >
                    <Input placeholder="body" />
                  </Form.Item>
                </>
              )
            } else if (actionType === 'Oracle') {
              return (
                <>
                  <Form.Item label="Price Url" name="url" rules={[{ required: true, message: 'Please input Url!' }]}>
                    <Input placeholder="url" />
                  </Form.Item>

                  <Form.Item label="Token Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                    <Input placeholder="token name" />
                  </Form.Item>
                </>
              )
            } else if (actionType === 'BuyToken') {
              return (
                <>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input address!' }]}
                  >
                    <Input placeholder="address" />
                  </Form.Item>

                  <Form.Item
                    label="SellAssetName"
                    name="sellTokenName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input SellTokenName!',
                      },
                    ]}
                  >
                    <Input placeholder="SellTokenName" />
                  </Form.Item>

                  <Form.Item
                    label="SellAmount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                  >
                    <Input placeholder="amount" type="number" />
                  </Form.Item>

                  <Form.Item
                    label="BuyTokenName"
                    name="buyTokenName"
                    rules={[{ required: true, message: 'Please input BuyTokenName!' }]}
                  >
                    <Input placeholder="BuyTokenName" />
                  </Form.Item>

                  <Form.Item
                    label="ReceiverEmail"
                    name="receiverEmail"
                    rules={[
                      {
                        required: true,
                        message: 'Please input ReceiverEmail!',
                      },
                    ]}
                  >
                    <Input placeholder="ReceiverEmail" />
                  </Form.Item>
                </>
              )
            } else if (actionType === 'Slack') {
              return (
                <>
                  <Form.Item
                    label="SlackHookUrl"
                    name="slack_hook_url"
                    rules={[
                      {
                        required: true,
                        message: 'Please input SlackHookUrl!',
                      },
                    ]}
                  >
                    <Input placeholder="SlackHookUrl" />
                  </Form.Item>
                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: 'Please input message!',
                      },
                    ]}
                  >
                    <Input placeholder="message" />
                  </Form.Item>
                </>
              )
            }
          }}
        </Form.Item>
      </Form>
    </Modal>
  )
}

Action.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Action
