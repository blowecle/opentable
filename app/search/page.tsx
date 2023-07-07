import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import SearchSidebar from './components/SearchSideBar'

export default function Search() {
  return (
    <>
      <Header/>
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
      <SearchSidebar/>
        <div className="w-5/6">
          <RestaurantCard/>
        </div>
      </div>
      </>
  )
}
