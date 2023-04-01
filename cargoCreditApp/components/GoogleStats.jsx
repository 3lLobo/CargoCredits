import Image from "next/image"
import { useState } from "react"
import MonthDrop from './MonthDrop'
import dynamic from 'next/dynamic'
import ConvertCredits from './ConvertCredits'


const Donut = dynamic(() => import('./Donut'), {
  // suspense: true,
})

function GoogleStats() {

  const travel = [
    {
      transport: 'walking',
      distance: '25',
      green: true,
      imageUrl:
        '/transport/walk.svg',
    },
    {
      transport: 'bike',
      distance: '321',
      green: true,
      imageUrl:
        '/transport/bike.svg',
    },
    {
      transport: 'car',
      distance: '211',
      green: false,
      imageUrl:
        '/transport/car.svg',
    },
    {
      transport: 'plane',
      distance: '1100',
      green: false,
      imageUrl:
        '/transport/plane.svg',
    },
  ]
  const [month, setMonth] = useState('Choose a Month!')

  function dynamicRange(x) {
    if (month === 'Choose a Month!') {
      return '-'
    }
    const newX = Math.round(x * month.length / 6)
    return newX.toString()
  }


  return (
    <div className="w-full h-full flex flex-row">
      <div className=" w-1/2 col-span-1">
        <div className="mr-auto max-w-xl py-1 px-4 sm:px-6 lg:px-6 lg:py-11">
          <div
            className="flex justify-center w-full"
          >
            <MonthDrop month={month} setMonth={setMonth} />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-8">
            <div className="lg:col-span-1">
              <ul distance="list" className="space-y-12 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:gap-x-8">
                {travel.map((element) => (
                  <li key={element.transport}
                  >
                    <div className="flex flex-row items-center space-x-4 lg:space-x-6">
                      <div className="relative h-16 w-16 rounded-full lg:h-20 lg:w-20 ring-4 ring-ccgreen1 bg-snow" >
                        <Image
                          src={element.imageUrl} alt="" fill
                        />

                      </div>
                      <div className="space-y-1 text-md font-bold leading-6 ">
                        {/* <h3>{element.transport}</h3> */}
                        <p className="text-ccDarkText">{dynamicRange(element.distance)} km</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5 sm:space-x-4 my-auto">

              {(month !== 'Choose a Month!') &&
                <Donut travel={travel} />
              }
            </div>
          </div>
        </div>
      </div>
      {(month !== 'Choose a Month!') &&
        <div
          className="flex w-1/2 ml-auto">

          <ConvertCredits distance={travel.filter((el) => {
            if (el.green) {
              return el
            }
          }).map((el) => el.distance)}
            month={month}
          />
        </div>
      }
    </div >
  )
}



export default GoogleStats