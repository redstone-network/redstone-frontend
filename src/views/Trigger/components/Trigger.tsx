import React from 'react'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import PropTypes from 'prop-types'

const Trigger = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Create Trigger"
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
        name="TriggerForm"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ triggerType: '' }}
        autoComplete="off"
        style={{ padding: '20px' }}
      >
        <Form.Item
          label="Type"
          name="triggerType"
          rules={[{ required: true, message: 'Please input your triggerType!' }]}
        >
          <Select placeholder="Select a trigger type">
            <Select.Option value="Timer">Timer</Select.Option>
            <Select.Option value="Schedule">Schedule</Select.Option>
            <Select.Option value="PriceGT">PriceGT</Select.Option>
            <Select.Option value="PriceLT">PriceLT</Select.Option>
            <Select.Option value="Arh999LT">Arh999 less than</Select.Option>
            <Select.Option value="TransferProtect">TransferProtect</Select.Option>
            <Select.Option value="OakTimer">OakTimer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.triggerType !== currentValues.triggerType}
        >
          {({ getFieldValue }) => {
            const triggerType = getFieldValue('triggerType')
            if (triggerType === 'Timer') {
              return (
                <Form.Item
                  label="Interval"
                  name="interval"
                  rules={[{ required: true, message: 'Please input timer!' }]}
                >
                  <Input placeholder="Interval" addonAfter="S" />
                </Form.Item>
              )
            } else if (triggerType === 'Schedule') {
              return (
                <Form.Item
                  label="schedule"
                  name="schedule"
                  rules={[{ required: true, message: 'Please input schedule!' }]}
                >
                  <DatePicker showTime />
                </Form.Item>
              )
            } else if (triggerType === 'PriceGT') {
              return (
                <Form.Item
                  label="PriceGT"
                  name="priceGT"
                  rules={[{ required: true, message: 'Please input priceGT!' }]}
                >
                  <Input placeholder="PriceGT" />
                </Form.Item>
              )
            } else if (triggerType === 'PriceLT') {
              return (
                <Form.Item
                  label="PriceLT"
                  name="priceLT"
                  rules={[{ required: true, message: 'Please input priceLT!' }]}
                >
                  <Input placeholder="PriceLT" />
                </Form.Item>
              )
            } else if (triggerType === 'Arh999LT') {
              const per10Seconds = 10
              const weekSeconds = 60 * 60 * 24 * 7
              const monthSeconds = 60 * 60 * 24 * 30
              return (
                <>
                  <Form.Item
                    label="Indicator"
                    name="indicator"
                    rules={[{ required: true, message: 'Please input indicator!' }]}
                  >
                    <Input placeholder="Arh999LT indicator" />
                  </Form.Item>

                  <Form.Item
                    label="Cycle"
                    name="seconds"
                    rules={[
                      {
                        required: true,
                        message: 'Please select investment cycle!',
                      },
                    ]}
                  >
                    <Select placeholder="Select a investment cycle">
                      <Select.Option value={per10Seconds}>Per 10 Seconds</Select.Option>
                      <Select.Option value={weekSeconds}>Per Week</Select.Option>
                      <Select.Option value={monthSeconds}>Per Month</Select.Option>
                    </Select>
                  </Form.Item>
                </>
              )
            } else if (triggerType === 'TransferProtect') {
              return (
                <>
                  <Form.Item
                    label="Amount Limit"
                    name="maxAmount"
                    rules={[
                      {
                        required: true,
                        message: 'Please input single transaction limit!',
                      },
                    ]}
                  >
                    <Input placeholder="single transaction limit" type="number" />
                  </Form.Item>

                  <Form.Item
                    label="Times Limit"
                    name="maxCount"
                    rules={[
                      {
                        required: true,
                        message: 'Please input transfer max count!',
                      },
                    ]}
                  >
                    <Input placeholder="Transaction limit per 100 blocks" type="number" />
                  </Form.Item>
                </>
              )
            } else if (triggerType === 'OakTimer') {
              return (
                <>
                  <Form.Item
                    label="CycleSeconds"
                    name="cycle_seconds"
                    rules={[
                      {
                        required: true,
                        message: 'Please input single cycle seconds!',
                      },
                    ]}
                  >
                    <Input placeholder="cycle seconds" type="number" />
                  </Form.Item>
                  <Form.Item
                    label="RepeatTimes"
                    name="repeat_times"
                    rules={[
                      {
                        required: true,
                        message: 'Please input RepeatTimes!',
                      },
                    ]}
                  >
                    <Input placeholder="Repeat Times" type="number" />
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

Trigger.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Trigger
