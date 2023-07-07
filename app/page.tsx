import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { Cuisine, PRICE, Location, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine,
  location: Location,
  price: PRICE,
  slug: string,
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
    }
  });
  return restaurants;
}

export default async function Home() {

  const restaurants = await fetchRestaurants();
  console.log({restaurants});
  return (
    <main>
      <main>
      <Header/>
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
        ))}
      </div>
      </main>
    </main>
  )
}
