import React from 'react'
import { Form, Input, Button } from 'antd'
import './style.scss';


export function Register() {
  return (
    <div className="form-panel">
        <div className="form-header">
            <p>Sign up</p>
        </div>
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
    >
        <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
        label="Password"
        name="re-password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>


        <Form.Item wrapperCol={{offset: 8, span: 16}} className='form-button-section'>
            <Button type="primary" htmlType="submit" >
                Sign up
            </Button>
            <Button htmlType="button">
                Reset
            </Button>
        </Form.Item>
    </Form>
</div>
  )
}
