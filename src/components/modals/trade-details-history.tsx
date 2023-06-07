import React, { useEffect } from "react";
import {
  Button,
  Modal,
  message,
  Select,
  Divider,
  Space,
  Row,
  Col,
  List,
} from "antd";
import useUserStore from "@/stores/user.store";

import { acceptTrade } from "@/data/trade-requests";
import { getInventory } from "@/data/inventory";
import useItemStore from "@/stores/items.store";
import { addItemToTrade, getTradeDetails } from "@/data/trade-details";
import { TradesTableType } from "@/types/trades.type";

interface Props {
  details: TradesTableType;
}

const TradeDetailsHistoryModal = (props: Props) => {
  const { user } = useUserStore((state) => state);
  const { setItems, items } = useItemStore((state) => state);
  const [isYourOfferLocked, setIsYourOfferLocked] = React.useState(false);
  const [offers, setOffers] = React.useState<any[]>([]);
  const [partnerOffers, setPartnerOffers] = React.useState<any[]>([]);
  const [data, setData] = React.useState<any[]>([]);
  const [selectValue, setSelectValue] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const plotDetails = () => {
    if (user.id === props.details.userId1) {
      setIsYourOfferLocked(
        props.details?.userAccept1 === "pending" ? false : true
      );
    } else if (user.id === props.details.userId2) {
      setIsYourOfferLocked(
        props.details?.userAccept2 === "pending" ? false : true
      );
    }
  };

  const onSelectChange = (value: number) => {
    setSelectValue(value);
  };

  const addOffer = async () => {
    try {
      await addItemToTrade(props.details.id, user.id, selectValue);
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

  const getTradeOffers = async () => {
    // get my inventory
    setPartnerOffers([]);
    setOffers([]);
    const tradeDetails = await getTradeDetails(props.details.id);
    tradeDetails.forEach(
      (item: { id: any; itemId: number; userId: number }) => {
        const name = items.find((i) => i.id === item.itemId)?.name;
        if (item.userId === user.id) {
          setOffers((offers) => [...offers, name]);
        } else if (item.userId !== user.id) {
          setPartnerOffers((offers) => [...offers, name]);
        }
      }
    );
  };

  const lockOffer = async () => {
    try {
      await acceptTrade(props.details.id);
      message.success("Offer locked!");
      setIsYourOfferLocked(true);
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      getMyInventory();
      getTradeOffers();
      plotDetails();
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        title="View Trade"
        open={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setIsModalVisible(false);
            }}
            type={"default"}
            size="large"
          >
            Close View
          </Button>,
        ]}
        width={1000}
      >
        <Row justify="space-between" gutter={20}>
          <Col span={12}>
            <div className="border rounded border-solid border-gray-300 p-6 pt-1 min-h-64">
              <Divider orientation="left">Your Offers</Divider>
              <List
                size="small"
                className="mb-6"
                bordered
                dataSource={offers}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="border rounded border-solid border-gray-300 p-6 pt-1 min-h-64">
              <Divider orientation="left">Trader Offers</Divider>
              <List
                size="small"
                className="mb-6"
                bordered
                dataSource={partnerOffers}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </div>
          </Col>
        </Row>

        <Divider></Divider>
      </Modal>

      <Button
        size="large"
        type="default"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        View Trade
      </Button>
    </>
  );
};

export default TradeDetailsHistoryModal;
