import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx"
import {events} from "../../dummydb/dbEvents"
import api from "../../Base/fetchData"
import ViewMore from "../Common/ViewMore";
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
export default class Element extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:this.props.title,
            task:this.props.task,
            web:this.props.web,
            list: [],
            activeIndex:null,
            page:1,
            loading:false,
            body:{},
            
        }
        
    };
    // componentDidMount=()=>{
        
        
    // }
    componentDidUpdate=(prevProps, prevState, snapshot)=>{
        if(this.props.body != prevProps.body){
            this.state.body = this.props.body;
        }
        if(this.props.task != prevProps.task){
            console.log("start update")
            var task_id = this.props.task[this.props.web]
            //var task_id = this.props.task[this.props.web];
            console.log("task id ",this.props.task,task_id,this.props.web)
            this.Search(task_id);
        }
        
    }
    seeMore(){
        this.setState({page:this.state.page+1});
        this.SearchMore();
    };
    async Search(task_id){
       if(task_id){
        this.setState({loading:true})
        var result= await api.getResult(task_id);
        //console.log(result)
        this.setState({list:result.data})
        this.setState({loading:false})
       }
        
        
    }
    async SearchMore(){
        this.setState({loading:true})
        var body = {
            "type": this.props.body.type,
            "area": this.props.body.area,
            "district": this.props.body.district,
            "city": this.props.body.city,
            "text": this.props.body.text,
            "page": this.state.page
        }
        console.log("body",body,this.state.body)
        var result= await api.searchOneWeb(body,this.state.web);
        this.setState({list:[...this.state.list,...result.data]})
        this.setState({loading:false})
    }
    render(){

        return(
            <div className="wrapper-items">
                <div><h2>{this.state.title}</h2></div>
                <div className="eventsItems">
                    {
                        this.state.loading?(<ReactSpinner />):(<div>
                    {
                        this.state.list.map((item,index) => (   
                                
                            <a href={item.link} target="_blank" key={index}>
                                <div key={index} className="eventsItem">
                                    <div className="eventsDate">
                                    <img src={Image.vsdx}></img>
                                    </div>
                                    <div className="eventsContent">
                                    <div className="eventsItemTitle"> {item.title}</div>
                                    <div className="eventsItemTime">
                                        <img className="eventsIcon" src={Image.clock}/>
                                        <div className="eventsItemStartEnd">{item.date}</div>
                                    </div>
                                    </div>
                                </div>
                            </a>
                    ))
                    }
                    </div>)}
                    
                </div>
                <div className="view-more">{
                        <ViewMore  className="viewmore"  onClick={this.seeMore.bind(this)}/> }
                    </div>
            </div>
        )
    }
}