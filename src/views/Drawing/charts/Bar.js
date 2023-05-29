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



export default function BarComponent({ title, indicators, entity, vsField}){
    const { range, getDataByRecord } = useDrawing()
    const [showTotal, setShowTotal] = useState(false)
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
      (async ()=>{
          const dataRecords = []
          for(const indicator of indicators ) {
            dataRecords.push( await getDataByRecord(entity.name, vsField.api_name, indicator.name) )
          }
          if( dataRecords.length > 0 ) {
            setLabels( Object.keys( dataRecords[0] ).filter( label => showTotal ? label==='[count]' : label!=='[count]' ) )
            setValues( dataRecords.map( record => {
              if( showTotal ) return {'[count]': record['[count]']}
              delete record['[count]']
              return record
            }).map( record => Object.values(record) ) )
          }
      })()
    }, [indicators, entity.name, getDataByRecord, vsField.api_name, showTotal]);


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