import { Doughnut, defaults } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

// defaults.global.tooltips.enabled = true
// defaults.global.legend.position = 'bottom'

function Donut({ travel }) {

  const data = {
    labels: travel.map((el) => el.transport),
    datasets: [
      {
        label: '# of Votes',
        data: travel.map((el) => el.distance),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],

  }
  console.log("🚀 ~ file: Donut.jsx ~ line 7 ~ Donut ~ data", data)

  return (
    <Doughnut
      data={data}
      redraw
      options={{
        // maintainAspectRatio: false,
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true,
        //       },
        //     },
        //   ],
        // },
        legend: {
          labels: {
            fontSize: 11,
          },
        },
      }}
    />
  )
}

export default Donut