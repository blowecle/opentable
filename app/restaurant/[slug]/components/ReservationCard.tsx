"use client"
import { useState } from 'react'
import { partySize, times } from '../../../../data'
import DatePicker from 'react-datepicker'

export default function ReservationCard({openTime, closeTime}: {openTime: string, closeTime: string}) {

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const handleChangeDate = (date: Date | null) => {
    if(date){
      return setSelectedDate(date)
    } else return setSelectedDate(null)
  }

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if(time.time === openTime){
        isWithinWindow = true;
      }
      if(isWithinWindow){
        timesWithinWindow.push(time);
      }
      if(time.time === closeTime){
        isWithinWindow = false;
      }
  })

  return timesWithinWindow;
}

  return (
        <div className="fixed w-[15%] bg-white rounded p-3 ml-5 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
              {partySize.map((size) => (
                <option value={size.value}>{size.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Date</label>
              <DatePicker
                className="py-3 border-b font-light text-reg w-24"
                dateFormat="MMMM d"
                wrapperClassName="w-[48%]"
                selected={selectedDate}
                onChange={handleChangeDate}
              />
              </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light">
                {filterTimeByRestaurantOpenWindow().map((time, index) => (
                  <option value={time.time} key={index}>{time.displayTime}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            >
              Find a Time
            </button>
          </div>
        </div>
  )
}
