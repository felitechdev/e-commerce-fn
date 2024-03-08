import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "@ant-design/charts";
import Chart from "react-apexcharts";
import { groupBy } from "lodash";
import { fetchUsers } from "../../../redux/Reducers/usersSlice";
import { useEffect } from "react";

// percentages for daily and monthly orders and earnings based on weekly and yearly data, respectively.

export const DashboardTopCard = ({ className }) => {
  const { orders } = useSelector((state) => state.orders);

  const now = new Date();
  const today = new Date(now.setDate(now.getDate()));
  const thisweek = new Date(now.setDate(now.getDate() - 7));
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

  const totalDailyOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).getDate() == today.getDate() &&
      new Date(order.createdAt).getMonth() == today.getMonth() &&
      today.getFullYear() == new Date(order.createdAt).getFullYear()
  ).length;
  const totalDailyEarning = orders
    .filter(
      (order) =>
        new Date(order.createdAt).getDate() == today.getDate() &&
        new Date(order.createdAt).getMonth() == today.getMonth() &&
        today.getFullYear() == new Date(order.createdAt).getFullYear()
    )
    .reduce((acc, order) => acc + order.amount, 0);

  const totalWeeklyOrders = orders.filter(
    (order) => new Date(order.createdAt) > thisweek
  ).length;
  const totalWeeklyEarning = orders
    .filter((order) => new Date(order.createdAt) > thisweek)
    .reduce((acc, order) => acc + order.amount, 0);

  const totalMonthlyOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).getMonth() == today.getMonth() &&
      today.getFullYear() == new Date(order.createdAt).getFullYear()
  ).length;
  const totalMonthlyEarning = orders
    .filter(
      (order) =>
        new Date(order.createdAt).getMonth() == today.getMonth() &&
        today.getFullYear() == new Date(order.createdAt).getFullYear()
    )
    .reduce((acc, order) => acc + order.amount, 0);

  const totalYearlyOrders = orders.filter(
    (order) => new Date(order.createdAt).getFullYear() == today.getFullYear()
  ).length;
  const totalYearlyEarning = orders
    .filter(
      (order) => new Date(order.createdAt).getFullYear() == today.getFullYear()
    )
    .reduce((acc, order) => acc + order.amount, 0);

  // Calculate percentages
  const dailyOrdersPercentage = (totalDailyOrders / totalWeeklyOrders) * 100;
  const dailyEarningPercentage = (totalDailyEarning / totalWeeklyEarning) * 100;
  const weeklyOrdersPercentage = (totalWeeklyOrders / totalMonthlyOrders) * 100;
  const weeklyEarningPercentage =
    (totalWeeklyEarning / totalMonthlyEarning) * 100;
  const monthlyOrdersPercentage =
    (totalMonthlyOrders / totalYearlyOrders) * 100;
  const monthlyEarningPercentage =
    (totalMonthlyEarning / totalYearlyEarning) * 100;

  const yearlyOrdersPercentage = (totalYearlyOrders / totalYearlyOrders) * 100;
  const yearlyEarningPercentage =
    (totalYearlyEarning / totalYearlyEarning) * 100;

  // Background color based on percentages
  // const dailyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const dailyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const weeklyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const weeklyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const monthlyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const monthlyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const yearlyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;
  // const yearlyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(29, 111, 43, 0.8))`;

  // const dailyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const dailyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const weeklyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const weeklyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const monthlyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const monthlyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const yearlyOrdersBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;
  // const yearlyEarningBgColor = `linear-gradient(to right, rgba(29, 111, 43, 0.5), rgba(255, 255, 255, 1))`;

  const dailyOrdersBgColor = `rgb(230, 244, 254)`;
  const dailyEarningBgColor = `rgb(230, 244, 254)`;
  const weeklyOrdersBgColor = `rgb(230, 244, 254)`;
  const weeklyEarningBgColor = `rgb(230, 244, 254)`;
  const monthlyOrdersBgColor = `rgb(230, 244, 254)`;
  const monthlyEarningBgColor = `rgb(230, 244, 254)`;
  const yearlyOrdersBgColor = `rgb(230, 244, 254)`;
  const yearlyEarningBgColor = `rgb(230, 244, 254)`;

  return (
    <Row gutter={[16, 16]} className="w-full">
      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: dailyOrdersBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Daily Orders</h3>
          </div>
          <div className="dashboard-top-card__value ">
            Total: {totalDailyOrders}{" "}
            <span style={{ fontSize: "12px", color: "#f4a535" }}>Orders</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {dailyOrdersPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: dailyEarningBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Daily Earnings</h3>
          </div>
          <div className="dashboard-top-card__value">
            Amount: {totalDailyEarning}{" "}
            <span style={{ fontSize: "12px", color: "#f75d81" }}> Rwf</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {dailyEarningPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: weeklyOrdersBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="text-black">Weekly Orders</h3>
          </div>
          <div className="dashboard-top-card__value ">
            Total: {totalWeeklyOrders}{" "}
            <span style={{ fontSize: "12px", color: "#f4a535" }}>Orders</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {weeklyOrdersPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: weeklyEarningBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className=""> Weakly Earnings </h3>
          </div>
          <div className="dashboard-top-card__value ">
            Amount: {totalWeeklyEarning}{" "}
            <span style={{ fontSize: "12px", color: "#f75d81" }}> Rwf</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {weeklyEarningPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: monthlyOrdersBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Monthly Orders</h3>
          </div>
          <div className="dashboard-top-card__value ">
            Total: {totalMonthlyOrders}{" "}
            <span style={{ fontSize: "12px", color: "#f4a535" }}>Orders</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {monthlyOrdersPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg text-black"
          style={{ background: monthlyEarningBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Monthly Earnings</h3>
          </div>
          <div className="dashboard-top-card__value ">
            Amount: {totalMonthlyEarning}{" "}
            <span style={{ fontSize: "12px", color: "#f75d81" }}> Rwf</span>
          </div>
          <div className="dashboard-top-card__subtitle">
            Percentage: {monthlyEarningPercentage.toFixed(2)}%
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg "
          style={{ background: monthlyEarningBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Yearly Orders</h3>
          </div>

          <div className="dashboard-top-card__subtitle">
            Total: {totalYearlyOrders}{" "}
            <span style={{ fontSize: "12px", color: "#f4a535" }}>Orders</span>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card
          className="dashboard-top-card font-bold shadow-lg bg-primary"
          style={{ background: monthlyEarningBgColor }}
        >
          <div className="dashboard-top-card__title">
            <h3 className="">Yearly Earnings</h3>
          </div>

          <div className="dashboard-top-card__subtitle">
            Amount: {totalYearlyEarning}{" "}
            <span style={{ fontSize: "12px", color: "#f75d81" }}> Rwf</span>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export const OrdersLineCahrt = () => {
  const { orders } = useSelector((state) => state.orders);

  const now = new Date();
  const today = new Date(now.setDate(now.getDate()));

  const totalDailyOrders = orders.filter(
    (order) =>
      new Date(order.createdAt).getDate() == today.getDate() &&
      new Date(order.createdAt).getMonth() == today.getMonth() &&
      today.getFullYear() == new Date(order.createdAt).getFullYear()
  ).length;
  const totalDailyEarning = orders
    .filter(
      (order) =>
        new Date(order.createdAt).getDate() == today.getDate() &&
        new Date(order.createdAt).getMonth() == today.getMonth() &&
        today.getFullYear() == new Date(order.createdAt).getFullYear()
    )
    .reduce((acc, order) => acc + order.amount, 0);
  const data = [];
  for (let hour = 0; hour < 24; hour++) {
    let orderCount = 0;

    orders.forEach((order) => {
      const orderDate =
        new Date(order.createdAt).getDate() == today.getDate() &&
        new Date(order.createdAt).getMonth() == today.getMonth() &&
        today.getFullYear() == new Date(order.createdAt).getFullYear();
      console.log("orderdate", orderDate);
      if (orderDate && new Date(order.createdAt).getHours() === hour) {
        orderCount++;
      }
    });

    // Add data point to array
    data.push({ hour: `${hour} h:00 `, value: orderCount });
  }

  const formattedHours = data.map((point) =>
    point.hour.toString().padStart(2, "0")
  );

  const config = {
    data,
    height: 400,
    width: 300,
    xField: "hour",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
    },
    lineStyle: {
      stroke: "white", // make the line white
    },
    label: {
      style: {
        fill: "white", // make the label text white
      },
    },
    smooth: true,
    area: {
      style: {
        // fill: "rgba(29, 111, 43, 0.5)",
      },
    },
    xAxis: {
      tickFormatter: (axisValue) => formattedHours[axisValue],
      line: {
        style: {
          // stroke: "white", // make the x-axis line white
        },
      },
      label: {
        style: {
          fill: "white", // make the x-axis label text white
        },
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: "white", // make the y-axis line white
        },
      },
      label: {
        style: {
          fill: "white", // make the y-axis label text white
        },
      },
    },
  };

  return (
    <div className="   ">
      {/* <div className="bg-gradient-to-r  w-[100%]   from-primary  via-icon2 to-primeColor  shadow-lg rounded-md  "> */}
      <div className="bg-gradient-to-r  w-[100%]  bg-primary  shadow-lg rounded-md  ">
        <Row gutter={[16, 16]} className="mt-0 mx-2">
          <Col sm={24} md={8} className="">
            <p className="text-icon1 flex items-center pl-3 font-bold text-xl mb-1">
              Orders Vs Hours
            </p>
          </Col>
          <Col sm={12} md={6}>
            <p className="text-[white] font-bold text-md mb-1">
              Orders / {today.getHours()} h:00
            </p>
            <Statistic
              value={totalDailyOrders}
              valueStyle={{ fontSize: "1.25rem", fontWeight: "bold" }}
              suffix={
                <span style={{ fontSize: "12px", color: "#f4a535" }}>
                  {/* <span style={{ fontSize: "12px", color:  "#2962ff" }}></span> */}{" "}
                  Orders
                </span>
              }
              // prefix="Qty:"
            />
          </Col>
          <Col sm={12} md={8} className="">
            <p className="text-[white] font-bold text-md mb-1">
              Earnings / {today.getHours()} h:00{" "}
            </p>
            <Statistic
              value={totalDailyEarning}
              valueStyle={{ fontSize: "1.25rem", fontWeight: "bold" }}
              suffix={
                <span style={{ fontSize: "12px", color: "#f75d81" }}> Rwf</span>
              }
              // prefix="$"
            />
          </Col>
        </Row>

        <Line {...config} />
      </div>

      <SellerPieChart />
    </div>
  );
};

export const SellerPieChart = () => {
  const { orders } = useSelector((state) => state.orders);
  const { loading, users } = useSelector((state) => state.users);
  const groupeduser = groupBy(users, "role");

  const grouped = groupBy(users, "role");

  const options = { labels: Object.keys(grouped) };
  const series = Object.values(grouped).map((users) => users.length);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className=" shadow-lg border w-[100%] md:w-[40%]  mt-5    overflow-auto rounded-lg px-3   bg-[#e1e7f1]">
      <Row gutter={[16, 16]} className="">
        {Object.keys(groupeduser).map((role) => (
          <Col sm={24} md={12} key={role}>
            {/* <p
              style={{ fontSize: "12px", color: "#f75d81" }}
              className="font-bold text-md mb-1"
            >
              {role}
            </p> */}
            <Statistic
              value={groupeduser[role].length || 0}
              valueStyle={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "black",
              }}
              prefix={`${role}:`}
            />
          </Col>
        ))}
      </Row>

      <Chart
        options={options}
        series={series}
        type="pie"
        width="400"
        height="500"
      />
    </div>
  );
};
