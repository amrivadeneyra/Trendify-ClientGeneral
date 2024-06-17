import { getCategories } from '@/actions/get-categories'
import Link from 'next/link'
import { MainNav } from './main-nav'
import { NavbarActions } from './navbar-actions'
import { Container } from './ui/container'

export const Navbar = async () => {
  const categories = await getCategories()

  return (
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-3xl">TRENDIFY</p>
          </Link>
          <div className="hidden md:block">
            <MainNav data={categories} />
          </div>
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <NavbarActions />
        </div>
      </Container>
    </div>
  )
}
