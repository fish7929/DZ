import React, { PropTypes } from 'react'

class Page extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className={"container " + this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

export default Page