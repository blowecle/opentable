import React from 'react'
import RestaurantNavbar from './components/RestaurantNavBar'
import Header from './components/Header'
import NavBar from '../../components/NavBar'
import Title from './components/Title'
import Ratings from './components/Ratings'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'

export default function page() {
  return (
  <main className="bg-gray-100 min-h-screen w-screen">
    <main className="max-w-screen-2xl m-auto bg-white">
    <NavBar />
    <Header />
    {/* DESCRIPTION PORTION */}
    <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Title />
        <Ratings />
        <Description />
        <Images />
        <Reviews />
      </div>
      <ReservationCard />
    </div>
    {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */} {/* RESERVATION
    CARD PORTION */}
  </main>
</main>
  )
}
