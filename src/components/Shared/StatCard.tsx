import { Card, Badge, Space, Statistic } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { Formatter } from "antd/es/statistic/utils";

interface Props {
  /**
   * Value of the statistic
   */
  value: number;
  /**
   * Subtitle of the Statistic
   */
  statTitle: string;
  /**
   * Title of Card at the Very Top
   */
  cardTitle: string;
  /**
   * Percent of the Statistic - shown as a badge
   */
  percent?: number;
  /**
   * Color of the Badge
   */
  badgeColor?: string;
  /**
   * Precision of the Statistic - This does not animate
   * @default 0
   *
   * @example
   * 1.23 => 1.2
   */
  precision?: number;
  /**
   * Link to download the report
   * @default undefined
   */
  downloadLink?: string;
}

const StatCard = (props: Props) => {
  const {
    cardTitle,
    statTitle,
    value,
    precision,
    downloadLink,
    percent,
    badgeColor,
  } = props;
  return (
    <Badge.Ribbon
      text={<div>{percent}%</div>}
      color={badgeColor ? badgeColor : "green"}
      className={!percent ? "hidden" : ""}
      key={cardTitle}
    >
      <Card
        title={cardTitle}
        actions={[
          <Space direction="horizontal" key={1}>
            <CloudDownloadOutlined key="setting" />
            <a href={downloadLink} target="_blank">
              Download Report
            </a>
          </Space>,
        ]}
      >
        <Statistic
          title={statTitle}
          value={value}
          precision={precision}
          formatter={
            precision
              ? undefined
              : () => <CountUp preserveValue={true} end={value} separator="," />
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

export default StatCard;
