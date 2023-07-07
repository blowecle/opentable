import RestaurantNavbar from './components/RestaurantNavBar'
import Title from './components/Title'
import Ratings from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    }
  });

  if(!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
}
export default async function RestaurantDetails({params}: {params: {slug: string}}) {

  const restaurant = await fetchRestaurantBySlug(params.slug);

  console.log(restaurant)

  return (
  <>
    <div className="bg-white w-[70%] rounded p-3 shadow">
      <RestaurantNavbar slug={restaurant.slug}/>
      <Title name={restaurant.name}/>
      <Ratings />
      <Description description={restaurant.description}/>
      <Images images={restaurant.images}/>
      <Reviews />
    </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
  </>
  )
}
