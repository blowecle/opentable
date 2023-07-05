import Link from "next/link"

export default function RestaurantCard() {
    return (
        <div className="border-b flex pb-5">
            <img className='w-44 rounded' src='https://images.otstatic.com/prod1/52840109/3/medium.jpg' alt=''/>
            <div className="pl-5">
              <h2 className="text-3xl">Yamas Austin</h2>
              <div className="flex items-start">
                <div className="flex mb-2">*****</div>
                <p className="ml-2 text-sm">Awesome</p>
              </div>
              <div className="mb-9">
                <div className="font-light flex text-reg">
                <p className="mr-4">$$$</p>
                <p className="mr-4">Mexican</p>
                <p className="mr-4">Ottawa</p>
                </div>
              </div>
            <Link href="restaurant/milstone-grill">
              <div className='text-red-600'>
                View more information
              </div>
            </Link>
            </div>
          </div>
    )
}