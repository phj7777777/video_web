// components/Pagination.tsx
import usePagination from '@lucasmogari/react-pagination'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { memo, PropsWithChildren, ReactNode } from 'react'

const Pagination = ({ page, itemCount, perPage }) => {
  // use the usePagination hook
  // getPageItem - function that returns the type of page based on the index.
  // size - the number of pages
  const { getPageItem, totalPages } = usePagination({
    totalItems: itemCount,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 7,
  })

  const firstPage = 1
  // calculate the next page
  const nextPage = Math.min(page + 1, totalPages)
  // calculate the previous page
  const prevPage = Math.max(page - 1, firstPage)
  // create a new array based on the total pages
  const arr = new Array(totalPages)

  return (
    <div className="flex items-center gap-2">
      {[...arr].map((_, i) => {
        // getPageItem function returns the type of page based on the index.
        // it also automatically calculates if the page is disabled.
        const { page, disabled, current } = getPageItem(i)

        if (page === 'previous') {
          return (
            <PaginationLink page={prevPage} disabled={disabled} key={page}>
              {`<`}
            </PaginationLink>
          )
        }

        if (page === 'gap') {
          return <span key={`${page}-${i}`}>...</span>
        }

        if (page === 'next') {
          return (
            <PaginationLink page={nextPage} disabled={disabled} key={page}>
              {`>`}
            </PaginationLink>
          )
        }

        return (
          <PaginationLink active={current} key={page} page={page}>
            {page}
          </PaginationLink>
        )
      })}
    </div>
  )
}

function PaginationLink({ page, children, ...props }) {
  const router = useRouter()
  const query = router.query
  // we use existing data from router query, we just modify the page.
  const q = { ...query, page }
  return (
    <Link
      // only use the query for the url, it will only modify the query, won't modify the route.
      href={{ query: q }}
      // toggle the appropriate classes based on active, disabled states.
      className={cn({
        'p-2': true,
        'font-bold text-indigo-700': props.active,
        'text-indigo-400': !props.active,
        'pointer-events-none text-gray-200': props.disabled,
      })}
    >
      <div>{children}</div>
    </Link>
  )
}
export default memo(Pagination)
