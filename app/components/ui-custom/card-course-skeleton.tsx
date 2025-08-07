import { Card, CardContent, CardDescription, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function CardCourseSkeleton() {
  return (
    <div className='h-[288px] w-full'>
      <Card className='pt-0 hover:border-primary transition-colors duration-300 cursor-pointer max-w-[350px] sm:w-full sm:h-full mx-auto'>
        <CardHeader className='overflow-hidden p-0 grid grid-rows-1 min-h-[200px] w-full relative'>
          <CardDescription className='w-full h-full p-0 overflow-hidden'>
            <Skeleton className='w-full h-full object-cover rounded-t-xl rounded-b-none' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col justify-between flex-1'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-3/4' />
            </div>
            <div className='flex gap-3 mt-3'>
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-4 w-1/4' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
