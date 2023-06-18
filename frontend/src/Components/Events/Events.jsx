import React from "react";
import "./index.css";
import Element from "./Element";
import dbOptions from "../../dummydb/dbOptions.jsx"
import { Button, MenuItem, TextField } from "@material-ui/core";
import api from "../../Base/fetchData"
import ViewMore from "../Common/ViewMore";
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import Image from "../../Base/Image.jsx"
export default class Events extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: {},
            type: "Bán",
            area: "All",
            district: "All",
            city: "Hà Nội",
            text: "",
            summary:[],
            loadingSummary:false,
            page:1,
            expandindex:null
        }
        this.body = {
            "type": this.state.type,
            "area": this.state.area,
            "district": this.state.district,
            "city": this.state.city,
            "text": this.state.text,
            "page": 1
        };
        
    };
    
    componentDidMount = () => {
            this.doInit();
        }
    async doInit(){
      //  await this.doSearch();
        await   this.doSummary()
    }
    
    handleChangeType(option){
        this.setState({type:option.target.value},()=>{
            console.log(this.state.type)
        });
        
    };
    handleChangeArea(option){
        this.setState({area:option.target.value},()=>{console.log(this.state.area)});
        
    };
    handleChangeDistrict(option){
        this.setState({district:option.target.value},()=>{console.log(this.state.district)})
        
    };
    handleChangeCity(option){
        this.setState({city:option.target.value},()=>{console.log(this.state.city)});
    };
    handleExpand(idx){
        this.setState({ expandindex: this.state.expandindex === idx ? null : idx });
    }
    async handleClick(){
        this.setState({page:1},()=>{console.log(this.state.page)});
        this.setState({summary:[]},()=>{console.log(this.state.summary)});
        await this.doSearch()
        await this.doSummary()
    }
    async viewMore(){
        this.setState({page:this.state.page+1},()=>{console.log(this.state.page)});
        await this.doSearch()
        await this.doSummary()
    }
    async doSummary(){
        this.setState({loadingSummary:true})
        var res = await api.getSummary(this.state.results)
        this.setState({summary:[...this.state.summary,...res.data]})
        this.setState({loadingSummary:false})

    }
    async doSearch(){
        var body = {
            "type": this.state.type,
            "city": this.state.city,
            "district": this.state.district,
            "area": this.state.area,
            "text": this.state.text,
            "page": this.state.page
        }
        
        var res = await api.searchall(body);
        
        
        this.setState({results:res.data.result},console.log(this.state.results));
        console.log("result task id",this.state.results);
        this.body=body;
    };
    render() {
        return (
            <div className="eventsChild">
                <div className="search-bar">
                    <h2>Tìm kiếm</h2>
                    <div>
                        <div className="filter-wrapper">
                            <div className="filter-type">
                                <TextField
                                    name="type"
                                    className="outlined-basic"
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    label="Loại giao dịch"
                                    select
                                    value={this.state.type}
                                    onChange={this.handleChangeType.bind(this)}
                                >
                                    {dbOptions.types.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                </TextField>
                            </div>


                            <div className="filter-city">
                                <TextField
                                    name="city"
                                    label="Tỉnh/ Thành phố"
                                    className="outlined-basic"
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    select
                                    value={this.state.city}
                                    onChange={this.handleChangeCity.bind(this)}
                                >
                                    {dbOptions.cities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div className="filter-district">
                                <TextField
                                    name="district"
                                    className="outlined-basic"
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    label="Quận/ Huyện"
                                    select
                                    value={this.state.district}
                                    onChange={this.handleChangeDistrict.bind(this)}
                                >
                                    {dbOptions.districts
                                        .filter((option) => option.city === this.state.city)
                                        .map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </div>

                            <div className="filter-area">
                                <TextField
                                    name="area"
                                    className="outlined-basic"
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    label="Diện tích"
                                    select
                                    value={this.state.area}
                                    onChange={this.handleChangeArea.bind(this)}
                                >
                                    {dbOptions.areas.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="search-button">
                                <Button
                                    style={{
                                    width: "140px",
                                    marginTop: "12px",
                                    marginLeft: "20px",
                                    fontWeight: "400",
                                    background: "rgb(235, 43, 43)",
                                    color: "white",
                                    }}
                                    variant="contained"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    Search
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div><h1>Các nguồn dữ liệu</h1></div>  
                <div className="source-element">
                    
                    <div className="element">
                        <Element title="Batdongsan.vn" task={this.state.results} web = "batdongsanvn" body={this.body}></Element>
                    </div>     
                    <div className="element">
                        <Element title="Houseviet.vn"  task={this.state.results} web = "houseviet" body={this.body}></Element>
                    </div>    
                    <div className="element">
                        <Element title="Bds123.vn"  task={this.state.results} web = "bds123vn" body={this.body}></Element>
                    </div>   
                    <div className="element">
                        <Element title="Muaban.net"  task={this.state.results} web = "muabannet" body={this.body}></Element>
                    </div>   
                </div>              
                <div>
                    <h1>Tổng hợp</h1>
                    <div>
                    <div className="summaryItems">
                    {
                        this.state.loadingSummary?(<ReactSpinner />):(<div>
                    {
                        this.state.summary.map((item,index) => (   
                            this.state.expandindex === index ?
                            (
                                <div>
                                <div onClick={this.handleExpand.bind(this,index)} key={index}>  
                                <div key={index} className="eventsItem-normal">
                                            <div className="eventsIconItem">
                                            <img src={Image.collapse} ></img>
                                            </div>
                                            <div className="eventsContent">
                                            <div className="eventsItemTitle-normal"> {item[0].title}</div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                <div  key={index}>   
                                    { item.map((item2,index2) => (   
                                        <div key={index2} className="eventsItem">
                                            <div className="eventsDate">
                                            <img src={Image.vsdx}></img>
                                            </div>
                                            <div className="eventsContent">
                                            <div className="eventsItemTitle">
                                                <a href={item2.link} target="_blank" key={index}>
                                                    {item2.title}
                                                </a>
                                            </div>
                                            <div className="eventsItemSource">
                                                Source:    {item2.source}
                                            </div>
                                            <div className="eventsItemTime">
                                                <img className="eventsIcon" src={Image.clock}/>
                                                <div className="eventsItemStartEnd">{item2.date}</div>
                                            </div>
                                            </div>
                                        </div>
                                     ))}
                                </div> 
                                </div>
                            ):(
                                <div onClick={this.handleExpand.bind(this,index)} key={index}>  
                                <div key={index} className="eventsItem-normal">
                                            <div className="eventsIconItem">
                                            <img src={Image.expand} ></img>
                                            </div>
                                            <div className="eventsContent">
                                            <div className="eventsItemTitle-normal"> {item[0].title}</div>
                                            
                                            </div>
                                        </div>
                                    </div>
                            )
                    ))
                    }
                    </div>)}
                    
                </div>
                <div className="view-more">{
                        <ViewMore  className="viewmore"  onClick={this.viewMore.bind(this)}/> }
                    </div>
                    </div>
                </div>   
                      
            </div>
        )
    }
}