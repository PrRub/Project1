import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

function LineChart() {
  const [chartData, setChartData] = useState([]);
  const [xAxisData, setXaxisData] = useState();
  const [yAxisData, setYaxisData] = useState();

  //Fetch the Get API
  useEffect(() => {
    fetch("https://api.llama.fi/summary/fees/lyra?dataType=dailyFees")
      .then((result) => result.json())
      .then((response) => setChartData(response.totalDataChart));
  }, []);

//    const createDataChart =()=> {
//     let xAxisValue = [];
//     let yAxisValue = [];
//     const newArrayData = chartData;
//     for (let i = 0; i < newArrayData.length; i++) {
//     //Destructing the Array
//       let DateValues, AmountValue;
//       [DateValues, AmountValue] = newArrayData[i];

//       //Date Format
//       const dateFormat = new Date(DateValues);
//       var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//       var month = months[dateFormat.getMonth()];
//       var date = dateFormat.getDate();
//       var hour = dateFormat.getHours();
//       var min = dateFormat.getMinutes();
//       var time = date + " " + month + " " + hour + ":" + min;
//       //Push the new date format to the array
//       xAxisValue.push(time);
//       yAxisValue.push(AmountValue);
//     }
//     setXaxisData(xAxisValue);
//     setYaxisData(yAxisValue);
//   };

  useEffect(() => {
    function createDataChart() {
        let xAxisValue = [];
        let yAxisValue = [];
        const newArrayData = chartData;
        for (let i = 0; i < newArrayData.length; i++) {
        //Destructing the Array
          let DateValues, AmountValue;
          [DateValues, AmountValue] = newArrayData[i];
    
          //Date Format
          const dateFormat = new Date(DateValues);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var month = months[dateFormat.getMonth()];
          var date = dateFormat.getDate();
          var hour = dateFormat.getHours();
          var min = dateFormat.getMinutes();
          var time = date + " " + month + " " + hour + ":" + min;
          //Push the new date format to the array
          xAxisValue.push(time);
          yAxisValue.push(AmountValue);
        }
        setXaxisData(xAxisValue);
        setYaxisData(yAxisValue);
      };
    createDataChart();
  },[chartData]);

  const data = {
    labels: xAxisData,
    datasets: [
      {
        label: `$`,
        data: yAxisData,
        fill: true,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        tension:0.4,
        pointStyle:'react'
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default LineChart;
