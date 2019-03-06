
// External Libraries
import React, {Component} from 'react';

// Internal Components and CSS
import './MarksInput.css';
import Appbar from '../../components/Appbar/Appbar';
import Bottombar from '../../components/Bottombar/Bottombar';

class MarksInput extends Component {
    render() {
        return <div className="MarksInput">
            <Appbar title="Enter the marks" />
            <Bottombar 
                options={[{
                    value: "Back",
                    onClick: () => this.props.history.goBack()
                },{
                    value: "Next",
                    onClick: () => console.log("Next Clicked")
                }]}
            />
        </div>;
    }
};

export default MarksInput;