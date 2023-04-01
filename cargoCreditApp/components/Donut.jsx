import { Doughnut, defaults } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import Image from 'next/image';


ChartJS.register(ArcElement, Tooltip);

// defaults.global.tooltips.enabled = true
// defaults.global.legend.position = 'bottom'

function Donut({ travel, month }) {

  console.log("Traveeel", travel)

  const data = {
    labels: travel
      .filter((ele) => ele.distance !== 0)
      .map((el) => el.transport),
    datasets: [
      {
        label: 'Distance',
        data: travel.map((el) => el.distance.filter(
          (ele) => ele.month === month.slice(0, 3)
        )
          .filter((ele) => ele.distance !== 0)
          .map((ele) => {
            const ret = Math.log(ele.distance)
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
      className="relative flex flex-col items-center justify-center -m-6 rounded-xl bg-no-repeat bg-contain  bg-opacity-25"
    >
      <Image
        src="/treeCargo.svg"
        alt="treeCargo"
        width={200}
        height={200}
        className="absolute z-0 bottom-0 w-80"
      />
      <div
        className=" w-full h-full rounded-xl z-0"
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
              position: 'left',
              labels: {
                usePointStyle: true,
                fontSize: 11,
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default Donut