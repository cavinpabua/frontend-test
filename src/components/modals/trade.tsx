import React, { useEffect } from "react";
import {
  Button,
  Typography,
  Modal,
  message,
  Select,
  Divider,
  Space,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useUserStore from "@/stores/user.store";

import { createNewTrade } from "@/data/trade-requests";
import { getInventory } from "@/data/inventory";
import useItemStore from "@/stores/items.store";
import { addItemToTrade } from "@/data/trade-details";

const { Text } = Typography;

const { confirm } = Modal;

interface Props {
  survivorId: number;
  survivorName: string;
  inventory: any[];
}

const TradeModal = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const { setItems, items } = useItemStore((state) => state);
  const [offers, setOffers] = React.useState<any[]>([]);
  const [requestId, setRequestId] = React.useState<number>(0);
  const [data, setData] = React.useState<any[]>([]);
  const [selectValue, setSelectValue] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showConfirm = () => {
    confirm({
      title: "Initiate trading items?",
      icon: <ExclamationCircleFilled />,
      content:
        props.inventory?.length > 0
          ? `Initiate Trade with ${props.survivorName}?`
          : `${props.survivorName} has no items to trade! Do you still want to initiate trade?`,
      async onOk() {
        try {
          const request = await createNewTrade(user.id, props.survivorId);
          setRequestId(request.id);
          message.success("Trade request sent!");
          setIsModalVisible(true);
        } catch (err: any) {
          message.error(err.response.data.message);
        }
      },
    });
  };

  const onSelectChange = (value: number) => {
    setSelectValue(value);
  };

  const addOffer = async () => {
    try {
      await addItemToTrade(requestId, user.id, selectValue);
      const name = items.find((i) => i.id === selectValue)?.name;
      setOffers([...offers, name]);
      //   remove selection in data
      const newData = data.filter((item) => item.id !== selectValue);
      setData(newData);
      setSelectValue(0);
      message.success("Added to offers!");
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };

  const getMyInventory = async () => {
    // get my inventory
    const res = await getInventory(user.id);
    const inventory = res.map(
      (item: { id: any; itemId: number; quantity: any }) => {
        const name = items.find((i) => i.id === item.id)?.name;
        return {
          key: item.id,
          id: item.id,
          name: name,
          quantity: item.quantity,
        };
      }
    );
    setData(inventory);
  };

  useEffect(() => {
    getMyInventory();
  }, []);

  return (
    <>
      <Modal
        title="Add Items"
        open={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Divider orientation="left">My Offers</Divider>
        {offers.map((offer) => (
          <div key={offer}>
            <Text key={offer}>{offer}</Text>
          </div>
        ))}

        <Divider orientation="left">Add your offer</Divider>
        <Space direction="horizontal">
          <Select
            placeholder="Select item"
            onChange={onSelectChange}
            value={selectValue}
            className="w-52"
          >
            <Select.Option key={0} value={0} disabled>
              Select
            </Select.Option>
            {data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={addOffer}>
            Add To Offer
          </Button>
        </Space>
      </Modal>

      <Button size="large" type="default" onClick={showConfirm}>
        Trade Items
      </Button>
    </>
  );
};

export default TradeModal;
