import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
export function Login() {
    return (
        <Form>
            <Form.Item
                label='Username'
                name='username'
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Password'
                name='pasword'
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='remember'
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Button type='primary' htmlType='submit'>Submit</Button>
        </Form>
    )
}
