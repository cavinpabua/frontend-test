import React, { useEffect, useState } from "react";
import Meta from "@/components/Shared/Meta";
import { Space, Typography, Table, Avatar } from "antd";
import { ColumnsType } from "antd/lib/table";
import { capitalizeFirstLetterOfEachWord, getFirstLetters } from "@/data/utils";
import useSurvivorStore from "@/stores/survivor.store";
import { getAllSurvivors } from "@/data/survivor";
import Loader from "@/components/Shared/Loader";
import { SurvivorsTableType } from "@/types/survivor.type";
import useItemStore from "@/stores/items.store";
import TradeModal from "@/components/modals/trade";
import withAuth from "@/components/Shared/WithAuth";
import useUserStore from "@/stores/user.store";
const { Title } = Typography;

const SurvivorsInventory = () => {
  const { setSurvivors, survivors, setIsReady } = useSurvivorStore(
    (state) => state
  );
  const { user } = useUserStore((state) => state);

  const { items } = useItemStore((state) => state);
  const [data, setData] = useState<SurvivorsTableType[]>([]);
  const [domLoaded, setDomLoaded] = useState(false);
  const columns: ColumnsType<SurvivorsTableType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <Space>
          <Avatar>{getFirstLetters(text)}</Avatar>
          <a>{capitalizeFirstLetterOfEachWord(text)}</a>
        </Space>
      ),
    },

    {
      title: "Inventory",
      key: "inventoryString",
      dataIndex: "inventoryString",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { id, name, inventory }) => (
        <Space size="middle">
          <TradeModal
            survivorId={id}
            survivorName={name}
            inventory={inventory}
          />
        </Space>
      ),
    },
  ];

  const mapData = async () => {
    const res = survivors.map((survivor) => {
      let inventory = survivor.inventory;
      let inventoryArray: string[] = [];
      typeof inventory === "object" &&
        inventory.forEach((item: { itemId: number; quantity: any }) => {
          const name = items.find((i) => i.id === item.itemId)?.name;
          inventoryArray.push(`${item.quantity} ${name}`);
        });
      let inventoryString = inventoryArray.join(", ");

      return {
        ...survivor,
        inventoryString,
      };
    });
    const promiseAll = await Promise.all(res);
    // remove self from list
    const final = promiseAll.filter((survivor) => {
      return survivor.id !== user.id;
    });
    setData(final);
  };

  const getSurvivors = async () => {
    setIsReady(false);
    const res = await getAllSurvivors();
    setSurvivors(res);
    setIsReady(true);
    setDomLoaded(true);
    mapData();
  };

  useEffect(() => {
    getSurvivors();
  }, []);

  if (!domLoaded) return <Loader />;

  return (
    <>
      <Meta
        title="Survival Nexus - Inventory"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="mb-6">
        <Title level={3}>List of Survivors Inventories</Title>
      </div>
      {domLoaded && (
        <Table
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          dataSource={data}
        />
      )}
    </>
  );
};

export default withAuth(SurvivorsInventory);

export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
