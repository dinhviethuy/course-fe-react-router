import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { usePagination } from '~/hooks/use-pagination'

type PaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
}

export default function PaginationCustom({ currentPage, totalPages, paginationItemsToDisplay = 5 }: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay
  })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            href={currentPage === 1 ? undefined : `?page=${currentPage - 1}`}
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? 'link' : undefined}
          />
        </PaginationItem>

        {showLeftEllipsis && pages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=${1}`} isActive={currentPage === 1}>
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && pages[pages.length - 1] < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`} isActive={currentPage === totalPages}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
            href={currentPage === totalPages ? undefined : `?page=${currentPage + 1}`}
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? 'link' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
