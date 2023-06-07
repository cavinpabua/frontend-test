import React, { useEffect } from "react";
import Meta from "@/components/Shared/Meta";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tag, Space, Typography, Table, Avatar } from "antd";
import { ColumnsType } from "antd/lib/table";
import { SurvivorsTableType } from "@/types/survivor.type";
import {
  capitalizeFirstLetterOfEachWord,
  formatTime,
  getFirstLetters,
} from "@/data/utils";
import { getAllSurvivors } from "@/data/survivor";
import CreateSurvivorModal from "@/components/modals/create-survivor";
import useSurvivorStore from "@/stores/survivor.store";
import Loader from "@/components/Shared/Loader";
import withAuth from "@/components/Shared/WithAuth";
import useUserStore from "@/stores/user.store";
const { Title, Text } = Typography;

const Survivors = () => {
  const { setShowCreateModal, setSurvivors, survivors, setIsReady, isReady } =
    useSurvivorStore((state) => state);
  const { user } = useUserStore((state) => state);
  const [healthyCount, setHealthyCount] = React.useState(0);
  const [domLoaded, setDomLoaded] = React.useState(false);
  const columns: ColumnsType<SurvivorsTableType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <Space>
          <Avatar>{getFirstLetters(text)}</Avatar>
          <div>{capitalizeFirstLetterOfEachWord(text)}</div>
        </Space>
      ),
    },

    {
      title: "Status",
      key: "infected",
      dataIndex: "infected",
      render: (_, { infected }) => {
        let color = infected ? "red" : "green";
        return <Tag color={color}>{infected ? "INFECTED" : "HEALTHY"}</Tag>;
      },
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
      // dependent on country of user
      render: (text) => <Text>{formatTime(text)}</Text>,
    },
    {
      title: "Last Location",
      dataIndex: "lastLocation",
      key: "lastLocation",
      render: (_, { lastLocation }) => (
        <Space>
          {lastLocation?.latitude ? (
            <Text>
              {lastLocation?.latitude}, {lastLocation?.longitude}{" "}
            </Text>
          ) : (
            <Text>No Location Provided</Text>
          )}
        </Space>
      ),
    },
  ];

  const getSurvivors = async () => {
    setIsReady(false);
    const res = await getAllSurvivors();
    const healthy = res.filter(
      (survivor: { infected: any }) => !survivor.infected
    );
    setHealthyCount(healthy.length);
    setSurvivors(res);
    setIsReady(true);
    setDomLoaded(true);
  };

  useEffect(() => {
    getSurvivors();
  }, []);

  if (!isReady) return <Loader />;

  return (
    <>
      <Meta
        title="Survival Nexus - Survivors"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <CreateSurvivorModal />
      <div className="mb-8">
        <Title level={3}>List of Survivors</Title>
        <Text type="secondary">
          You have <span className="text-green-600">{healthyCount}</span>{" "}
          healthy survivors
        </Text>
        {user.role === "admin" && (
          <Button
            className="float-right"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setShowCreateModal(true)}
          >
            Add Survivor
          </Button>
        )}
      </div>
      {domLoaded && (
        <Table
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          bordered
          dataSource={survivors}
        />
      )}
    </>
  );
};

export default withAuth(Survivors);

export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
