import { Cuisine, Location, PRICE } from "@prisma/client"
import Link from "next/link"

export default function SearchSidebar({locations, cuisines, searchParams}: {locations: Location[], cuisines: Cuisine[], searchParams: { city?: string, cuisine?: string, price?: PRICE }}) {

  const prices = [{
    price: PRICE.CHEAP,
    label: "$",
    className: "border w-full test-reg font-light rounded-l p-2 text-center"
  }, {
    price: PRICE.REGULAR,
    label: "$$",
    className: "border w-full test-reg font-light p-2 text-center"
  }, {
    price: PRICE.EXPENSIVE,
    label: "$$$",
    className: "border w-full test-reg font-light rounded-r p-2 text-center"
  }]
    return (
        <div className='w-1/5 capitalize'>
          <div className="border-b pb-4">
            <h1 className='mb-2'>Region</h1>
            {locations.map((location) => (
              <Link href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  city: location.name
                }
              }
                }>
                <div className='flex'>
                  <p className="font-light text-reg">{location.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="border-b pb-4 mt-3">
            <h1 className='mb-2'>Cousine</h1>
            {cuisines.map((cuisine) => (
              <Link href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  cuisine: cuisine.name
                }
              }}>
                <div className='flex'>
                  <p className="font-light text-reg">{cuisine.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 ppb-4">
            <h1 className='mb-2'>Price</h1>
            <div className="flex">
              {prices.map(({price, label, className}) => (
                <Link href={{
                  pathname: '/search',
                  query: {
                    ...searchParams,
                    price
                  }
                }} className={className}>
                  {label}
                </Link>  
              ))}
            </div>
          </div>
        </div>
    )
}