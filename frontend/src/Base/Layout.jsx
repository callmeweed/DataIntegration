import React from "react";
import "./layout.css";
import Navigation from "../Components/Navigation/Navigation";

import Events from "../Components/Events/Events";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="portal-homepage">
                <div className="wrap">
                    
                        <div className="header">
                            <Navigation></Navigation>
                        </div>
                        <div className="content">                         
                            <div id="events-global">
                                <Events></Events>
                            </div>
                            
                        
                    </div>
                </div>
            </div>
        )
    }
}