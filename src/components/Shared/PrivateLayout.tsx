import {
  DashboardOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  SwapOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Space } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { logout } from "../../data/authentication";
import Image from "next/image";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] | any[] = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  getItem("Survivors", "/survivors", <UsergroupAddOutlined />),
  getItem("Trades", "1", <SwapOutlined />, [
    getItem("Open Trades", "/trades/open"),
    getItem("Trade History", "/trades/history"),
  ]),
  getItem("Inventory", "2", <WalletOutlined />, [
    getItem("My Inventory", "/inventory"),
    getItem("Survivors Inventory", "/inventory/survivors"),
  ]),
  getItem("Settings", "3", <SettingOutlined />, [
    getItem("Location", "/settings/location"),
    getItem("Password", "/settings/password"),
  ]),

  getItem("Logout", "/logout", <LogoutOutlined />),
];

const PrivateLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState([""]);
  const router = useRouter();

  const menuChanged = (value: any) => {
    if (value.key === "/logout") {
      handleLogout();
    } else {
      router.push(`${value.key}`);
      setActiveKey([value.key]);
    }
  };

  const handleLogout = async () => {
    await logout();
    Cookies.remove("token");
    router.replace("/login");
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="theme-purple"
      >
        <Space
          direction="horizontal"
          className={
            collapsed
              ? "rounded-2xl h-10 m-3 w-full ml-6"
              : "rounded-2xl h-10 m-3 w-full"
          }
        >
          <Image
            src="/icon.svg"
            alt="survival nexus logo"
            width={35}
            height={35}
          />
          <div
            className={
              collapsed
                ? "text-white font-semibold text-lg hidden"
                : "text-white font-semibold text-lg"
            }
          >
            Survival Nexus
          </div>
        </Space>
        <div className="flex flex-col justify-between h-full">
          <Menu
            theme="dark"
            className="theme-purple"
            selectedKeys={activeKey}
            onClick={menuChanged}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
      <Layout>
        <Content>
          <div className=" mx-16 my-10">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
