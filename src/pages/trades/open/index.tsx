import { getTrades } from "@/data/trade-requests";
import { Space, Table, Avatar, Typography, Button, Tag } from "antd";
import Meta from "@/components/Shared/Meta";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { TradesTableType } from "@/types/trades.type";
import { capitalizeFirstLetterOfEachWord, getFirstLetters } from "@/data/utils";
import useUserStore from "@/stores/user.store";
import TradeDetailsModal from "@/components/modals/trade-details";
import useTradesStore from "@/stores/trades.store";

const { Title, Text } = Typography;

const Trades = () => {
  const { user } = useUserStore((state) => state);
  const { trades, setTrades } = useTradesStore((state) => state);
  const columns: ColumnsType<TradesTableType> = [
    {
      title: "Trade ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trading With",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) =>
        (a.name ? a.name.length : 0) - (b.name ? b.name.length : 0),
      render: (text) => (
        <Space>
          <Avatar>
            {getFirstLetters(capitalizeFirstLetterOfEachWord(text))}
          </Avatar>
          <div>{capitalizeFirstLetterOfEachWord(text)}</div>
        </Space>
      ),
    },
    {
      title: "Trade Status",
      dataIndex: "status",
      key: "status",

      sorter: (a, b) =>
        (a.status ? a.status.length : 0) - (b.status ? b.status.length : 0),
      // PENDING, ACCEPTED, REJECTED Tags
      render: (text) => {
        const color =
          text === "pending" ? "orange" : text === "accepted" ? "green" : "red";
        return (
          <Space>
            <Tag color={color}>{text?.toUpperCase()}</Tag>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, details) => (
        <Space>
          <TradeDetailsModal details={details} />
        </Space>
      ),
    },
  ];

  const getOpenTrades = async () => {
    const res = await getTrades();
    const plotData: any = res.map(
      (trade: { user1: { id: number }; user2: any; id: any }) => {
        // check who is the partner using user and trade.user1 and trade.user2
        const partner = trade.user1?.id === user.id ? trade.user2 : trade.user1;
        return {
          ...trade,
          key: trade.id,
          name: partner?.name || "Anonymous",
        };
      }
    );
    setTrades(plotData);
  };

  useEffect(() => {
    getOpenTrades();
  }, []);

  return (
    <>
      <Meta
        title="Survival Nexus - Trades"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="mb-8">
        <Title level={3}>List of Open Trades</Title>
        <Text type="secondary">
          You have <span className="text-green-600">{trades.length}</span> open
          trades
        </Text>
      </div>
      <Table columns={columns} dataSource={trades} />
    </>
  );
};
export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
export default Trades;
