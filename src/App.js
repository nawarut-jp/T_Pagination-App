import FoodComponent from "./components/FoodComponent";
import { useEffect, useState } from "react";
import MenuData from "./data/MenuData";
import "./App.css";
function App() {
  const [foodData, setFoodData] = useState(MenuData); // ข้อมูลทั้งหมด
  const [dataInPage, setDataInPage] = useState([]); // set จำนวนปุ่ม
  const [page, setPage] = useState(0); // set index อยู่หน้าไหน

  const pagination = () => {
    const foodPerPage = 3; //แสดงรายการ 3 รายการ ต่อ 1 หน้า
    const pages = Math.ceil(MenuData.length / foodPerPage);

    const newFood = Array.from({ length: pages }, (data, index) => {
      const start = index * foodPerPage; // ได้ช่วงที่ [0,3]
      return MenuData.slice(start, start + foodPerPage);
    });
    return newFood;
  };
  const haddlePage = (index) => {
    setPage(index);
  };

  useEffect(() => {
    const paginate = pagination();
    setDataInPage(paginate);
    setFoodData(paginate[page]);
  }, [page]);

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {foodData.map((data, index) => {
          return <FoodComponent key={index} {...data} />;
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((data, index) => {
          return (
            <button
              key={index}
              onClick={() => haddlePage(index)}
              className={`page-btn ${index === page ? "active-btn" : null}`}>
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
