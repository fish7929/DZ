/** 
 * @component index.js
 * @time CreateTime
 * @author zhao
 */

import React, {PropTypes} from 'react'

import './index.scss'

class MyContainer extends React.Component{
    constructor(props, context){
        super(props, context)
    }

    render(){
        return(
            <div className="my-container">

            </div>
        )
    }

}

MyContainer.PropTypes = {

}

export default MyContainer