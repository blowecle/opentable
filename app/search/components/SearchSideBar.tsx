import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const fetchLocations = () => {
  const locations = prisma.location.findMany({
    select: {
      name: true
    }
  })
  return locations;
}

const fetchCusines = () => {
  const cuisines = prisma.cuisine.findMany({
    select: {
      name: true
    }
  })
  return cuisines;
}

export default async function SearchSidebar() {

  const locations = await fetchLocations();
  const cuisines = await fetchCusines();

    return (
        <div className='w-1/5 capitalize'>
          <div className="border-b pb-4">
            <h1 className='mb-2'>Region</h1>
            {locations.map((location) => (
              <div className='flex'>
                <input type="checkbox" className="mr-2"/>
                <p className="font-light text-reg">{location.name}</p>
              </div>
            ))}
          </div>
          <div className="border-b pb-4 mt-3">
            <h1 className='mb-2'>Cousine</h1>
            {cuisines.map((cuisine) => (
              <div className='flex'>
                <input type="checkbox" className="mr-2"/>
                <p className="font-light text-reg">{cuisine.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 ppb-4">
            <h1 className='mb-2'>Price</h1>
            <div className="flex">
              <button className="border w-full text-reg font-light rounded-l p-2">
                $
              </button>
              <button className="border-t border-r border-b w-full text-reg font-light p-2">
                $$
              </button>
              <button className="border-t border-r border-b w-full text-reg font-light rounded-r p-2">
                $$$
              </button>
            </div>
          </div>
        </div>
    )
}