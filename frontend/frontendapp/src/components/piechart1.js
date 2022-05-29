// Piechart 1 for user profile page showing numeric attendance for last 6 days

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export function PieChart1(props) {

    const [suma, setSuma] = useState('') // total days (out of 6) when user was absent
    const [sump, setSump] = useState('') // total days (out of 6) when user was present

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
              let sp = 0
              let sa = 0
              data.datetwo.forEach(function (item, i) {
                if(item<=70) // 70% or less attendance is marked absent
                { sa = sa + 1;}
                else
                { sp = sp + 1;} // 70% or more attendance - present
              });
              setSuma(sa)
              setSump(sp)
            }
          )
          .catch( error => console.error(error))
        }

    }, [props.username])

    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            label: 'Attendance',
            data: [sump, suma],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
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
            text: 'Numeric Attendance for last 6 days',
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
