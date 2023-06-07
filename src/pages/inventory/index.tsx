// this is dashboard with antd and tailwindcss

import React, { useEffect } from "react";
import Meta from "@/components/Shared/Meta";
import { Space, Typography, Table, Avatar } from "antd";
import { ColumnsType } from "antd/lib/table";
import { getFirstLetters } from "@/data/utils";
import { InventoryTableType } from "@/types/inventory.type";
import { getInventory } from "@/data/inventory";
import useUserStore from "@/stores/user.store";
import useItemStore from "@/stores/items.store";
import { getAllItems } from "@/data/items";
import withAuth from "@/components/Shared/WithAuth";
const { Title, Text } = Typography;

const Inventory = () => {
  const { user } = useUserStore((state) => state);
  const { setItems, items } = useItemStore((state) => state);
  const [data, setData] = React.useState<InventoryTableType[]>([]);
  const columns: ColumnsType<InventoryTableType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <Space>
          <Avatar>{getFirstLetters(text)}</Avatar>
          <Text>{text}</Text>
        </Space>
      ),
    },

    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
  ];

  const getMyInventory = async () => {
    // get my inventory
    const res = await getInventory(user.id);
    const inventory = res.map(
      (item: { id: any; itemId: number; quantity: any }) => {
        const name = items.find((i) => i.id === item.itemId)?.name;
        return {
          key: item.id,
          name: name,
          quantity: item.quantity,
        };
      }
    );
    setData(inventory);
  };

  const getItemList = async () => {
    // get all items
    const res = await getAllItems();
    setItems(res);
    getMyInventory();
  };

  useEffect(() => {
    getItemList();
  }, []);

  return (
    <>
      <Meta
        title="Survival Nexus - My Inventory"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="mb-8">
        <Title level={3}>My Inventory</Title>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default withAuth(Inventory);

export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
