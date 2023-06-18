import React from "react";
import Image from "../../Base/Image";
import "./index.css";
class ViewMore extends React.Component {
    render() {
        return (
          <div className="view-more" onClick={this.props.onClick}>
            <div className="view-more-content"> View more </div>
            <div className="view-more-icon">
              <img src={Image.arrowicon} alt = ""/>
            </div>
          </div>
        );
      }
}
 
export default ViewMore;

