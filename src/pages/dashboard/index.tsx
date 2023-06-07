// this is dashboard with antd and tailwindcss

import React, { useEffect, useState } from "react";
import Meta from "@/components/Shared/Meta";
import StatCard from "@/components/Shared/StatCard";
import { Col, Row, Typography } from "antd";
import { getHealthySurvivors, getInfectedSurvivors } from "@/data/survivor";
import {
  HealthySurvivorsType,
  InfectedSurvivorsType,
} from "@/types/survivor.type";
import withAuth from "@/components/Shared/WithAuth";
import { averageResourceAllocation } from "@/data/inventory";

const { Title, Text } = Typography;

const Dashboard = () => {
  const [healthy, setHealthy] = useState<HealthySurvivorsType>({
    count: 0,
    percentage: 0,
  });
  const [infected, setInfected] = useState<InfectedSurvivorsType>({
    count: 0,
    percentage: 0,
  });

  const [resourceAverage, setResourceAverage] = useState(0);

  const getHealthy = async () => {
    const data = await getHealthySurvivors();
    setHealthy(data);
  };

  const getInfected = async () => {
    const data = await getInfectedSurvivors();
    setInfected(data);
  };

  const getResourceAverage = async () => {
    const data = await averageResourceAllocation(1);
    setResourceAverage(data);
  };

  useEffect(() => {
    getHealthy();
    getInfected();
    getResourceAverage();
  }, []);
  return (
    <>
      <Meta
        title="Survival Nexus - Dashboard"
        description="Vital lifeline for the survival of humanity"
        image="/preview.png"
      />
      <div className="mb-6">
        <Title level={3}>Reports</Title>
        <Text type="secondary">
          Your camp has{" "}
          <span className="text-green-600">{healthy.percentage}%</span> healthy
          survivors
        </Text>
      </div>

      <Row gutter={24}>
        <Col span={8}>
          <StatCard
            cardTitle={"Number of Healthy Survivors"}
            statTitle={"Last 30 days"}
            percent={healthy.percentage}
            value={healthy.count}
          />
        </Col>
        <Col span={8}>
          <StatCard
            cardTitle={"Number of Infected Survivors"}
            statTitle={"Last 30 days"}
            percent={infected.percentage}
            badgeColor="red"
            value={infected.count}
          />
        </Col>
        <Col span={8}>
          <StatCard
            cardTitle={"Average Resource Allocation"}
            statTitle={"Food Resource per Survivor"}
            value={resourceAverage}
            precision={2}
          />
        </Col>
      </Row>
    </>
  );
};

export default withAuth(Dashboard);

export function getStaticProps() {
  return {
    props: { showSideBar: true },
  };
}
