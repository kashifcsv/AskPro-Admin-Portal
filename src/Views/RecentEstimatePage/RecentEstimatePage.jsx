import React from "react";
import Nav from "../../Components/Navigation/Navbar/Nav";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import Footer from "../../Components/Navigation/Footer/Footer";
import RecentEstimates from "../../Components/Tables/RecentEstimates/RecentEstimates";

const RecentEstimatePage = () => {
  return (
    <div className="main_menu">
      <div className="row">
        <div className="col-12">
          <Nav />
        </div>
      </div>
      <div className="row ">
        <div className="col-1 sidebar_bg_color">
          <Sidebar />
        </div>
        {/* ROW 1 */}
        <div className="col-11">
          <div className="row justify-content-center">
            <div className="col-11 mb-4">
              <RecentEstimates paginator={true} searchBar={true} moveup={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RecentEstimatePage;

// const TableHeadItem = ({ item }) => <th> {item.heading}</th>;
// const TableRow = ({ item, column }) => (
//   <tr>
//     {column.map((columnItem, index) => {
//       return <td> {item[`${columnItem.value}`]} </td>;
//     })}
//   </tr>
// );
