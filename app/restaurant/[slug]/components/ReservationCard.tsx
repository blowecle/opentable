"use client"

import { useState } from 'react'
import { partySize as partySizes, times } from '../../../../data'
import DatePicker from 'react-datepicker'
import useAvailabilities from '../../../../hooks/useAvailabilities'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { convertToDisplayTime } from '../../../utilities/convertToDisplayTime'

export default function ReservationCard({openTime, closeTime, slug}: {openTime: string, closeTime: string, slug: string}) {

  const { loading, error, data, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate ] = useState<Date | null>(new Date());
  const [ time, setTime ] = useState<string>(openTime);
  const [ partySize, setPartySize ] = useState<string>("2");
  const [ day, setDay ] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleChangeDate = (date: Date | null) => {
    if(date){
      setDay(date.toISOString().split('T')[0]);
      return setSelectedDate(date)
    } else return setSelectedDate(null)
  }

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize
    })
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
            <select name="" className="py-3 border-b font-light" id="" value={partySize} onChange={(e) => setPartySize(e.target.value)}>
              {partySizes.map((size, index) => (
                <option key={index} value={size.value}>{size.label}</option>
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
              <select name="" id="" className="py-3 border-b font-light" value={time} onChange={(e) => setTime(e.target.value)}>
                {filterTimeByRestaurantOpenWindow().map((time, index) => (
                  <option value={time.time} key={index}>{time.displayTime}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? <CircularProgress color="inherit"/> : "Find a Table"}
            </button>
          </div>
          {data && data.length ? (
            <div className='mt-4'>
              <p className="text-reg">Select a Time</p>
              <div className="flex flex-wrap mt-2">
                {data.map((time, index) => {
                  return time.available ? <Link href={`/reserve/${slug}?date=${day}&time=${time.time}&partySize=${partySize}`} key={index} className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3'>
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(time.time)}
                    </p>
                  </Link> : (
                    <p className="bg-gray-300 p-2 w-24 rounded p-3 mr-3 mb-3"/>
                  )})}
              </div>
            </div>
          ) : null}
        </div>
  )
}
