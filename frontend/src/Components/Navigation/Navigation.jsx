import React from "react";
import "./index.css";
import Image from "../../Base/Image.jsx"
export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nav: [
                { name: 'Hệ thống tích hợp dữ liệu bất động sản' },
                ,
            ]
        }
    }
    render() {
        return (
            <div className="nav">
                <div className="nav-logo">
                    <img src={Image.logo} alt='logo' />
                </div>
                <div className="nav-items">
                    {
                        this.state.nav.map((item, index) => {
                            return (
                                <div key={index} className="nav-item"><h2>{item.name}</h2></div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}