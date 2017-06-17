import React, { PropTypes } from 'react';

class NoMessage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="no-message-info">
                <span>{this.props.msg}</span>
            </div>
        )
    }
}
NoMessage.PropTypes = {
    data: PropTypes.string.isRequired
}

export default NoMessage;