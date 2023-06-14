import { Card, Space, Statistic, Typography } from "antd";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

const { Text } = Typography;

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
   * Subtext of the Statistic
   * @default undefined
   */
  subText?: string;

  /**
   * Is the Statistic a percentage
   * @default false
   *
   */
  isPercent?: boolean;

  /**
   * Is the Statistic rising or falling
   * @default false
   *
   */
  isRising?: boolean;

  /**
   * Precision of the Statistic - This does not animate
   * @default 0
   */
  precision?: number;
}

const StatCard = (props: Props) => {
  const { statTitle, value, precision, isPercent, subText, isRising } = props;
  return (
    <Card>
      <div>
        <Space direction="horizontal">
          <Statistic
            title={<Text strong>{statTitle}</Text>}
            value={value}
            precision={precision}
            formatter={
              precision
                ? undefined
                : () => (
                    <CountUp preserveValue={true} end={value} separator="," />
                  )
            }
            valueStyle={{
              fontSize: "30px",
              lineHeight: "45px",
            }}
            suffix={isPercent ? "%" : undefined}
          />
          {/* Percentage rise or fall here */}
          <div
            style={{
              margin: "0",
              position: "absolute",
              top: subText ? "50%" : "60%",
              transform: "translateY(-50%)",
              background: isRising ? "#D2FBDF" : "#FDE4E1",
              padding: "2px 10px",
              borderRadius: "40px",
              fontSize: "12px",
              color: isRising ? "#1CAF6B" : "#E4483D",
              height: "20px",
            }}
          >
            {isRising ? (
              <RiseOutlined
                style={{
                  fontWeight: "bold",
                }}
              />
            ) : (
              <FallOutlined
                style={{
                  fontWeight: "bold",
                }}
              />
            )}{" "}
            3.48%
          </div>
        </Space>
      </div>
      <Text type="secondary">{subText}</Text>
    </Card>
  );
};

export default StatCard;
