import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx";
import { events } from "../../dummydb/dbEvents";
import api from "../../Base/fetchData";
import ViewMore from "../Common/ViewMore";
import { ReactSpinner } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";
export default class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      task: this.props.task,
      web: this.props.web,
      list: [],
      activeIndex: null,
      page: 1,
      loading: false,
      body: {},
    };
  }
  // componentDidMount=()=>{

  // }
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.props.body != prevProps.body) {
      this.state.body = this.props.body;
    }
    if (this.props.task != prevProps.task) {
      console.log("start update");
      var task_id = this.props.task[this.props.web];
      //var task_id = this.props.task[this.props.web];
      console.log("task id ", this.props.task, task_id, this.props.web);
      this.Search(task_id);
    }
  };
  seeMore() {
    this.setState({ page: this.state.page + 1 });
    this.SearchMore();
  }
  async Search(task_id) {
    if (task_id) {
      this.setState({ loading: true });
      var result = await api.getResult(task_id);
      //console.log(result)
      this.setState({ list: result.data });
      this.setState({ loading: false });
    }
  }
  async SearchMore() {
    this.setState({ loading: true });
    var body = {
      type: this.props.body.type,
      area: this.props.body.area,
      district: this.props.body.district,
      city: this.props.body.city,
      text: this.props.body.text,
      page: this.state.page,
    };
    console.log("body", body, this.state.body);
    var result = await api.searchOneWeb(body, this.state.web);
    this.setState({ list: [...this.state.list, ...result.data] });
    this.setState({ loading: false });
  }

  // fakeData = {
  //   title: "Bán nhà Cầu Giấy, nhà đẹp, ở ngay, tặng full nội thất, giá 4.5 tỷ",
  //   link: "https://batdongsan.vn/ban-nha-cau-giay-nha-dep-o-ngay-tang-full-noi-that-gia-45-ty-r257600",
  //   date: "18:07 28/11/2022",
  //   thumbnail:
  //     "https://cdn.batdongsan.vn/queue/upload/thumb/file/realestate/2022/11/182735/382968/125-235-132-74-00b29e52-1115-4c2e-aa91-fc2ce51ac75c.jpeg",
  //   area: "30m",
  //   price: "4.2 tỷ",
  //   source: "batdongsanvn",
  // };

  render() {
    return (
      <div className="wrapper-items">
        <div>
          <h2>{this.state.title}</h2>
        </div>
        <div className="eventsItems">
          {this.state.loading ? (
            <ReactSpinner />
          ) : (
            <div>
              {this.state.list.map((item, index) => (
                <a href={item.link} target="_blank" key={index}>
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid black",
                      borderRadius: "5px",
                      padding: "3px",
                      marginBottom: "3px",
                    }}
                  >
                    <div>
                      <img src={item.thumbnail} height={200} width={300}></img>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <h3 style={{ marginBottom: "10px", textTransform:"capitalize" }}>{item.title}</h3>
                      <div style={{ display: "flex" }}>
                        <h4 style={{ margin: "0 5px 10px 0" }}>Ngày đăng:</h4>
                        {item.date}
                      </div>
                      <div style={{ display: "flex" }}>
                        <h4 style={{ margin: "0 5px 10px 0" }}>Giá tiền:</h4>
                        {item.price}
                      </div>
                      <div style={{ display: "flex" }}>
                        <h4 style={{ margin: "0 5px 10px 0" }}>Diện tích:</h4>
                        {item.area}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        {/*<div className="view-more">*/}
        {/*  {<ViewMore className="viewmore" onClick={this.seeMore.bind(this)} />}*/}
        {/*</div>*/}
      </div>
    );
  }
}
