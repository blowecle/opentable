import React from 'react'
import MenuCard from './MenuCard'
import { Item } from '@prisma/client'

export default function Menu({menu}: {menu: Item[]}) {
  return (
    <main className="bg-white mt-5">
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between">
                {menu.length ? menu.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}/>
                )) : (
                  <p className="text-lg">This restaurant does not have a menu to view</p>
                )}
            </div>
          </div>
        </main>
  )
}
