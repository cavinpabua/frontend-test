// ChangePassword Form using antd and Tailwindcss
import { Alert, Button, Form, Input } from "antd";
import React, { useState } from "react";
import Meta from "@/components/Shared/Meta";
import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "@/data/authentication";
import withAuth from "@/components/Shared/WithAuth";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }) => {
    setLoading(true);
    try {
      const { oldPassword, newPassword, passwordConfirm } = values;
      await changePassword(oldPassword, newPassword, passwordConfirm);

      setSuccess(true);
      form.resetFields();
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error: any) {
      const arrayMessage =
        typeof error.response.data.message === "string"
          ? [error.response.data.message]
          : error.response.data.message;
      const message = arrayMessage.join(" and ");
      setError(message);
    }
    setLoading(false);
  };

  return (
    <>
      <Meta
        title="Survival Nexus - Change Password"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-sm space-y-5">
          <Form
            form={form}
            name="change_password"
            className="items-center justify-center w-full space-y-3"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="w-full"
                closable
                onClose={() => setError("")}
              />
            )}
            {success && (
              <Alert
                message="Password changed successfully!"
                type="success"
                showIcon
                className="w-full"
                closable
                onClose={() => setSuccess(false)}
              />
            )}
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Current Password"
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="New Password"
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}

export default withAuth(ChangePassword);
