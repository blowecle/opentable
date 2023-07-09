

import Header from '../components/Header'
import RestaurantSearchCard from './components/RestaurantCard'
import SearchSidebar from './components/SearchSideBar'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const fetchRestaurantsByLocation = (searchParams: SearchParams) => {
  const where: any = {};
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true
  }

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price
    }
    where.price = price;
  }
  return prisma.restaurant.findMany({
    where: where,
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

export default async function Search({searchParams}: {searchParams: { city: string, cuisine: string, price: PRICE }}) {

  const restaurants = await fetchRestaurantsByLocation(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCusines();

  return (
    <>
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
      <SearchSidebar
      locations={locations} 
      cuisines={cuisines}
      searchParams={searchParams}
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
