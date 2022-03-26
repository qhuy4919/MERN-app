import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

export function Login() {
    const [ form ] = Form.useForm();

    const onResetField = () => {
        form.resetFields();
    };
    return (
        <div className="form-panel">
            <div className="form-header">
                <p>Sign in</p>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
        
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
        
                <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='form-button-section'>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Button htmlType="button" onClick={onResetField}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <p>Don&apos;t have account? <Link to={'/register'}><Button type='link' style={{padding: '0'}}>register</Button></Link></p>
        </div>
    );
}
