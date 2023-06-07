import { getTradeHistory } from "@/data/trade-requests";
import { Space, Table, Avatar, Typography, Tag } from "antd";
import Meta from "@/components/Shared/Meta";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { TradesTableType } from "@/types/trades.type";
import {
  capitalizeFirstLetterOfEachWord,
  formatTime,
  getFirstLetters,
} from "@/data/utils";
import useUserStore from "@/stores/user.store";
import TradeDetailsHistoryModal from "@/components/modals/trade-details-history";

const { Title, Text } = Typography;

const Trades = () => {
  const { user } = useUserStore((state) => state);
  const [data, setData] = useState<TradesTableType[]>([]);
  const columns: ColumnsType<TradesTableType> = [
    {
      title: "Trade ID",
      dataIndex: "id",
      key: "id",
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
      title: "Date Logged",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => {
        return (
          <Space>
            <div>{formatTime(text)}</div>
          </Space>
        );
      },
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
      title: "Action",
      key: "action",
      render: (_, details) => (
        <Space>
          <TradeDetailsHistoryModal details={details} />
        </Space>
      ),
    },
  ];

  const getOpenTrades = async () => {
    const res = await getTradeHistory();
    const plotData: any = res.map(
      (trade: { user1: { id: number }; user2: any; id: any }) => {
        const partner = trade.user1?.id === user.id ? trade.user2 : trade.user1;
        return {
          ...trade,
          key: trade.id,
          name: partner?.name || "Anonymous",
        };
      }
    );
    setData(plotData);
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
        <Title level={3}>List of Past Trades</Title>
        <Text type="secondary">
          You have <span className="text-green-600">{data.length}</span> past
          trades
        </Text>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
export default Trades;
