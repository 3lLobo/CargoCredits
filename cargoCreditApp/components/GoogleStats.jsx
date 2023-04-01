import Image from "next/image"
import { useState } from "react"
import MonthDrop from './MonthDrop'
import dynamic from 'next/dynamic'
import ConvertCredits from './ConvertCredits'
import clsx from "clsx"
import { travelStats } from "./travelData"
import { motion } from "framer-motion"

const Donut = dynamic(() => import('./Donut'), {
  // suspense: true,
})

function GoogleStats() {


  const [month, setMonth] = useState('Choose a Month!')

  // function dynamicRange(x) {
  //   if (month === 'Choose a Month!') {
  //     return '-'
  //   }
  //   const newX = Math.round(x * month.length / 6)
  //   return newX.toString()
  // }


  return (
    <div className="w-full h-full flex flex-row">
      <div className=" w-1/2 col-span-1">
        <div className="mr-auto max-w-xl py-1 px-4 sm:px-6 lg:px-6 lg:py-11">
          <div
            className="flex justify-center w-full"
          >
            <MonthDrop month={month} setMonth={setMonth} />
          </div>
          <motion.div
            className="grid grid-cols-2 gap-3 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: month !== 'Choose a Month!' ? 1 : 0 }}
            transition={{ duration: 1 }}

          >
            <div className="lg:col-span-1">
              <ul distance="list" className="space-y-12 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:gap-x-8">
                {travelStats
                  // .filter((ele) => ele.distance.filter(
                  //   (el) => el.month === month.slice(0, 3)
                  // ).map((el) => el.distance)[0] !== 0)
                  .map((ele) => (
                    <li key={ele.transport}
                      className={clsx([
                        (ele.distance.filter(
                          (el) => el.month === month.slice(0, 3)
                        ).map((el) => el.distance)[0] == 0) ? 'opacity-0' : 'opacity-100',
                      ])}
                    >
                      <div className="flex flex-row items-center space-x-4 lg:space-x-6">
                        <div
                          className={clsx([
                            "relative h-16 w-16 rounded-full lg:h-20 lg:w-20 ring-8 ",
                            ele.green ? ' ring-emerald-300 bg-emerald-100' : ' ring-red-500 bg-red-100',
                          ])}
                        >
                          <Image
                            src={ele.imageUrl}
                            alt={ele.transport + ' icon'}
                            fill
                          />

                        </div>
                        <div className="space-y-1 text-md font-bold leading-6 ">
                          {/* <h3>{element.transport}</h3> */}
                          <p className="text-ccDarkText">{ele.distance.filter(
                            (el) => el.month === month.slice(0, 3)
                          ).map((el) => el.distance)[0]} km</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="space-y-5 sm:space-x-4 my-auto">

              {(month !== 'Choose a Month!') &&
                <Donut travel={travelStats} month={month} />
              }
            </div>
          </motion.div>
        </div>
      </div>
      {
        (month !== 'Choose a Month!') &&
        <div
          className="flex w-1/2 ml-auto">

          <ConvertCredits distance={travelStats.filter((el) => {
            if (el.green) {
              return el
            }
          }).map((el) => el.distance.filter(
            (ele) => ele.month === month.slice(0, 3)
          ).map((ele) => ele.distance)[0]).reduce((a, b) => a + b, 0)}
            month={month}
          />
        </div>
      }
    </div >
  )
}



export default GoogleStats