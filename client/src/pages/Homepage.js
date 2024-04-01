import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/items.css";
import { useDispatch } from "react-redux";
function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState("Fruits");
  const categories = [
    {
      name: "Fruits",
    },
    {
      name: "Soft Drinks",
    },
    {
      name: "Vegetables",
    },
    {
      name: "Meat",
    },
  ];
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div
              onClick={() => setSelectedCategoty(category.name)}
              className={`d-flex category ${
                selectedCategory === category.name && "selected-category"
              }`}
            >
              <h4>{category.name}</h4>
            </div>
          );
        })}
      </div>

      <Row gutter={20}>
        {itemsData
          .filter((i) => i.category === selectedCategory)
          .map((item) => {
            return (
              <Col span={6} xs={24} lg={6} md={12} sm={6}>
                <Item item={item} />
              </Col>
            );
          })}
      </Row>
    </DefaultLayout>
  );
}

export default Homepage;
