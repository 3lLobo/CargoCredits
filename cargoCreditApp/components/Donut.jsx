import { Doughnut, defaults } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);

// defaults.global.tooltips.enabled = true
// defaults.global.legend.position = 'bottom'

function Donut({ travel, month }) {

  const data = {
    labels: travel.map((el) => el.transport),
    datasets: [
      {
        label: 'distance',
        data: travel.map((el) => el.distance.filter(
          (ele) => ele.month === month.slice(0, 3)
        )
          .filter((ele) => ele.distance !== 0)
          .map((ele) => {
            const ret = Math.log(ele.distance)
            console.log("RET", ret)
            return ret
          })[0]
        ),
        backgroundColor: [
          'rgba(190,242,100, 0.79)',
          'rgba(152,211,113, 0.79)',
          'rgba(220,38,38, 0.79)',
          'rgba(169,10,10, 0.79)',
          // 'rgba(153, 102, 255, 0.79)',
          // 'rgba(255, 159, 64, 0.79)',
        ],
        borderColor: [
          'rgba(190,242,100, 1)',
          'rgba(152,211,113, 1)',
          'rgba(220,38,38, 1)',
          'rgba(169,10,10, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],

  }
  console.log("🚀 ~ file: Donut.jsx ~ line 7 ~ Donut ~ data", data)

  return (
    <div
      className="flex flex-col items-center justify-center -m-6 rounded-xl bg-[url('/treeCargo.svg')] bg-no-repeat bg-contain  bg-opacity-25"
    >
      <Doughnut
        data={data}
        redraw
        options={{
          // maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 11,
            },
          },
        }}
      />
    </div>
  )
}

export default Donut