

import Header from '../components/Header'
import RestaurantSearchCard from '../components/RestaurantSearchCard'
import SearchSidebar from './components/SearchSideBar'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true
}

const fetchRestaurantsByLocation = (city: string | undefined) => {
  if (!city) {
    return prisma.restaurant.findMany({
        select: select
      });
  } else return prisma.restaurant.findMany({
    where: {
      location: {
        name: city
      }
    },
    select: select
})
}


export default async function Search({searchParams}: {searchParams: { city: string }}) {

  const restaurants = await fetchRestaurantsByLocation(searchParams.city.toLowerCase());
  console.log(restaurants)

  return (
    <>
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
      <SearchSidebar/>
        <div className="w-5/6">
          {restaurants.length ? <>
          {restaurants.map((restaurant) => 
          <RestaurantSearchCard restaurant={restaurant} key={restaurant.id}/>
          )}</> : <p>{`Sorry, we couldn't find anything in that area :(`}</p>}
        </div>
      </div>
      </>
  )
}
