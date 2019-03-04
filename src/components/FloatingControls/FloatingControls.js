
// External Libraries
import React, {Component, Fragment} from 'react';

// Internal Libraries
import './FloatingControls.css'

class FloatingControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    showOptions = () => {
        this.setState({visible: !this.state.visible});
    }

    render() {

        let bottom = 164;

        return <Fragment>
            <div className="floating" onClick={"onClick" in this.props ? this.props.onClick : this.showOptions}>+</div>
            {("options" in this.props ? this.props.options.map(option => {
                let style = {bottom};
                bottom += 60;
                if (this.state.visible) {
                    style['transform'] = "translateX(0)";
                }
                return <div key={option.value} style={style} className="floating-option" onClick={option.click}>
                    <p>{option.value}</p>
                </div>;
            }) : null)}
        </Fragment>
    }
}

export default FloatingControls;