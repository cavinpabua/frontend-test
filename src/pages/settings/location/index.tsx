import { Alert, Button, Form, Input } from "antd";
import React, { useState } from "react";
import Meta from "@/components/Shared/Meta";
import { AimOutlined } from "@ant-design/icons";
import withAuth from "@/components/Shared/WithAuth";
import { addNewLocation } from "@/data/locations";
import useUserStore from "@/stores/user.store";

const ChangeLocation = () => {
  const { user } = useUserStore((state) => state);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: { latitude: string; longitude: string }) => {
    setLoading(true);
    try {
      const { latitude, longitude } = values;
      await addNewLocation(user.id, latitude, longitude);

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
        title="Survival Nexus - Change Location"
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
                message="Location changed successfully!"
                type="success"
                showIcon
                className="w-full"
                closable
                onClose={() => setSuccess(false)}
              />
            )}
            <Form.Item
              name="latitude"
              rules={[
                {
                  required: true,
                  message: "Please input your new Latitude!",
                },
              ]}
            >
              <Input
                prefix={<AimOutlined className="site-form-item-icon" />}
                placeholder="Latitude"
              />
            </Form.Item>
            <Form.Item
              name="longitude"
              rules={[
                {
                  required: true,
                  message: "Please input your new Longitude!",
                },
              ]}
            >
              <Input
                prefix={<AimOutlined className="site-form-item-icon" />}
                placeholder="Longitude"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Change Location
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

export default withAuth(ChangeLocation);
