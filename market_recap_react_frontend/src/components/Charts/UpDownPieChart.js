import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);




const data = {
  labels: ["UP", "DOWN", "UNCHANGED"],
  datasets: [
    {
      label: 'Up,Down,Unchanged',
      data: [12, 19, 3],
      hidden: false,
      backgroundColor: [
        'rgba(0, 255, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(255, 255, 255, 1)',
      ],
      borderColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255 1)',
      ],
      borderWidth: 2,
    
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  tooltips: {
    enabled: false
 },
 title: {
  display: true,
  text: "World Wide Wine Production"
},
 plugins: {
  legend: {
    display: false
  }
 
}
};


export default function UpDownPieChart() {
  return (
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="m-t-10">
            <h4 class="card-title">
              Daily Up and Down</h4>
          </div>
          <div class="card-body">
            <Pie data={data}
              width={500}
              options={options} />

          </div>
          <div class="row">
            <div class="col">
              <h4 class="mt-3 mb-1">253</h4>
              <p>UP</p>
              </div>
              <div class="col">
              <h4 class="mt-3 mb-1">253</h4>
                      <p>DOWN</p>
              </div>
              <div class="col">
              <h4 class="mt-3 mb-1">253</h4>
                      <p>UNCHANGED</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>);
}