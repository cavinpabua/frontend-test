import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Input, Form, Alert, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Meta from "@/components/Shared/Meta";
import { authLogin } from "@/data/authentication";
import Cookies from "js-cookie";
import Image from "next/image";
import useUserStore from "@/stores/user.store";
import { getOwnData } from "@/data/survivor";

export default function Login() {
  const { setUser } = useUserStore((state) => state);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const res = await authLogin(values.email, values.password);
      Cookies.set("token", res.accessToken);
      const user = await getOwnData();
      setUser(user);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Meta
        title="Survival Nexus - Login"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center w-full max-w-sm space-y-5">
            <div className="full-w text-center">
              <Space direction="horizontal">
                <Image
                  className="w-auto h-12 mx-auto"
                  src="/icon.svg"
                  alt="Survival Nexus Logo"
                  width={50}
                  height={50}
                />
                <span className=" text-3xl font-extrabold text-gray-900 text-gray-100">
                  Survival Nexus
                </span>
              </Space>
            </div>
            <Form
              name="normal_login"
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
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Please input a valid Email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  type="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  // className="w-full"
                  block
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: { showSideBar: false },
  };
}
