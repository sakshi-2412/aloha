import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function BarChartProfile(props) {

    const [datab, setDatab] = useState('')
    const [labels, setLabels] = useState('')
    const datetoday = new Date()

    function subDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() - days);
      return result;
    }

    useEffect(() => {
        if(props.username) {
        fetch('http://127.0.0.1:8000/api/attend/chart/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: props.username })
          })
          .then( data => data.json())
          .then(
            data => {
              setDatab(data.datetwo);
            }
          )
          .catch( error => console.error(error))
        }
        
        let datelabel = []

        for(let i=0; i<6; i++)
        {
          let datei = subDays(datetoday, i)
          let day = datei.getDate()
          let month = datei.getMonth() + 1
          let year = datei.getFullYear()
          datelabel.push(day + "/" + month + "/" + year)
        }
        setLabels(datelabel)

    }, [props.username])

    const data = {
        labels,
        datasets: [
          {
            label: 'Percentage Attendance',
            data: datab,
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
          },
        ],
      };


    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Percentage Attendance for past week',
        },
      },
    };

    return (
      <>
      <div style={{width:"800px", margin:"10px auto"}}>
      <Bar options={options} data={data} className="bar_chart"/>
      </div>

      <style jsx>{`
      .bar_chart {
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
        padding: 5px 10px;
        border-radius: 10px;
      }
      `}</style>

      </>
    );
}
