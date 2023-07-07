import Link from "next/link"

export default function RestaurantNavbar({slug}: {slug: string}) {
  return (
        <nav className="flex text-reg border-b pb-2">
          <Link href={`/restaurant/${slug}`}>
            <div className="mr-7"> Overview </div>
          </Link>
          <Link href={`/restaurant/${slug}/menu`}>
            <div className="mr-7"> Menu </div>
          </Link>
        </nav>
  )
}
