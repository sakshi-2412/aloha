// Piechart 2 for user profile page showing working hours stats for last 6 days

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export function PieChart2(props) {

    const [sumo, setSumo] = useState('') // total days (out of 6) for overtime working hours
    const [suma, setSuma] = useState('') // average working hours 
    const [sumu, setSumu] = useState('') // undertime working hours
    const [sumz, setSumz] = useState('') // zero working hours

    useEffect(() => {

        // fetch attendance data of logged-in user for past week
        if(props.username) {
        fetch('http://127.0.0.1:8000/api/attend/chart/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: props.username })
          })
          .then( data => data.json())
          .then(
            data => {
              let so = 0
              let su = 0
              let sa = 0
              let sz = 0
              data.datetwo.forEach(function (item, i) {
                if(item>=100) // more than 100% is overtime
                { so = so + 1;}
                else if(item>=70) // more than 70% less than 100% is average
                { sa = sa + 1;}
                else if(item>0) // more than 0% less than 70% is undertime
                { su = su + 1;}
                else
                { sz = sz + 1;} // zero
              });
              setSumo(so)
              setSuma(sa)
              setSumu(su)
              setSumz(sz)
            }
          )
          .catch( error => console.error(error))
        }

    }, [props.username])

    const data = {
        labels: ['Overtime', 'Average', 'Undertime', 'Zero'],
        datasets: [
          {
            label: '# of Votes',
            data: [sumo, suma, sumu, sumz],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      };

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Working hours for last 6 days',
          },
        },
      };

    return (
        <>
        <div style={{ margin:"50px 20px"}}>
            <Pie options={options} data={data} className="pie_chart"/>
        </div>

        <style jsx>{`
        .pie_chart {
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 8px;
        padding: 5px 10px;
        border-radius: 10px;
        }

        `}</style>
        </>
    );
}
