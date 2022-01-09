import React, {useState } from "react";
import Chart from "react-apexcharts";



export default function MyChart() {
  
    const options = {
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return parseInt(val) + "%"
                }
            },
            plotOptions: {
                pie: {
                  startAngle: 0,
                  endAngle: 360,
                  expandOnClick: true,
                  offsetX: 0,
                  offsetY: 0,
                  customScale: 1,
                  dataLabels: {
                      offset: 0,
                      minAngleToShowLabel: 10
                  }, 
                  donut: {
                    size: '0%',
                    background: 'transparent',
                    labels: {
                      show: false,
                      name: {
                        show: true,
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: undefined,
                        offsetY: -10,
                        formatter: function (val) {
                          return val
                        }
                      },
                      value: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: undefined,
                        offsetY: 16,
                        formatter: function (val) {
                          return val
                        }
                      },
                      total: {
                        show: false,
                        showAlways: false,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {
                          return w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0)
                        }
                      }
                    }
                  },      
                }
              }
        };

    const data = [1, 1, 1];

    const label = ['UP', 'DOWN', 'NO CHANGE'];
  


    return (

        <div className="row">
          <div className="donut">
            <Chart
              options={options}
              series={data}
              type="donut"
              width="350"
            />
          </div>
        </div>
  
    );
  
}
