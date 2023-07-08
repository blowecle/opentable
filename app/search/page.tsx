

import Header from '../components/Header'
import RestaurantSearchCard from '../components/RestaurantSearchCard'
import SearchSidebar from './components/SearchSideBar'
import { Cuisine, PRICE, PrismaClient } from '@prisma/client'

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

const fetchRestaurantsByLocation = (
  {city, cuisine, price}: {city?: string, cuisine?: string, price?: PRICE}
) => {
  if (!city && !cuisine && !price) {
    return prisma.restaurant.findMany({
        select: select
      });
  } else return prisma.restaurant.findMany({
    where: {
      location: {
        name: city
      },
      cuisine: {
        name: cuisine
      },
      price: price
    },
    select: select
})
}

const fetchLocations = async () => {
  const locations = prisma.location.findMany()
  return locations;
}

const fetchCusines = async () => {
  const cuisines = prisma.cuisine.findMany()
  return cuisines;
}

export default async function Search({searchParams}: {searchParams: { city?: string, cuisine?: string, price?: PRICE }}) {

  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCusines();

  return (
    <>
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
      <SearchSidebar
      searchParams={searchParams}
      locations={locations} 
      cuisines={cuisines}
      />
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
