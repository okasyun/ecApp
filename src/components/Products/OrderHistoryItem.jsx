import React from "react";
import Divider from "@material-ui/core/Divider";
import { OrderedProducts } from "./index";
import { TextDetail } from "../UIkit";

const datetimeToString = (date) => {
  return (
    date.getFullYear() +
    "" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    "" +
    ("00" + date.getHours()).slice(-2) +
    "" +
    ("00" + date.getMinutes()).slice(-2) +
    "" +
    ("00" + date.getSeconds()).slice(-2)
  );
};

const dateToString = (date) => {
  return (
    date.getFullYear() +
    "" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const OrderHistory = (props) => {
  const order = props.order;
  const orderedDateTime = datetimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.updated_at.toDate());
  const price = `¥${order.amount.toLocaleString()} `;
  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={"注文ID"} value={order.id} />
      <TextDetail label={"注文日時"} value={orderedDateTime} />
      <TextDetail label={"発送予定日"} value={shippingDate} />
      <TextDetail label={"注文金額"} value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} key={order.id} />
      )}
      <div className="module-spacer--extra-extra-small" />
      <Divider />
    </div>
  );
};

export default OrderHistory;
