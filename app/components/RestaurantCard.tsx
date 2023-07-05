import Link from "next/link";

export default function RestaurantCard() {
    return (
            <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
              <Link href='/restaurant/milestone-grill'>
              <img src='https://resizer.otstatic.com/v2/photos/wide-huge/2/31852905.jpg' alt='' className='w-full h-36'></img>
              <div className='p-1'>
                <h3 className='font-bold text-2xl mb-2'>Milestone Grill</h3>
                <div className='flex items-start'>
                  <div className='flex mb-2'>
                    *****
                  </div>
                  <p className='ml-2'>77 reviews</p>
                </div>
                <div className='flex capitalize text-reg font-light'>
                  <p className='mr-3'>mexican</p>
                  <p className='mr-3'>$$$$</p>
                  <p>Toronto</p>
                </div>
                <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
              </div>
              </Link>
            </div>
    )
}