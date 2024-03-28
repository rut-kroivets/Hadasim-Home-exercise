import {Line} from "react-chartjs-2"
import React from 'react'
import {Chart as ChartJS} from 'chart.js/auto'

function LineCart({props}){
    return( <Line data={props} />)
}
export default LineCart;