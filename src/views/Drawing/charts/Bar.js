import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Typography } from '@mui/material';
import { useDrawing } from '../Context';
import { useState, useEffect } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)



export default function BarComponent({ title, indicators }){
    const { range, getDataByRecord } = useDrawing()
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
      (async ()=>{
          const dataRecords = []
          for(const indicator of indicators ) {
            dataRecords.push( await getDataByRecord(indicator) )
          }
          console.log( 'dataRecords', dataRecords )
          setLabels( Object.keys( dataRecords[0] ) )
          setValues( dataRecords.map( record => Object.values(record) ) )
      })()
    }, [indicators]);

    


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title
          },
        },
    };


    const data = {
        labels,
        datasets:
          indicators.map( (indicator, index) => (
            {
                label: 'name 1',
                data: values[index],
                backgroundColor: indicator.color,
            }
        )),
    }


    return <Bar options={options} data={data} />
}