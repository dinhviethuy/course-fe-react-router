import Wrapper from "~/components/layouts/client/wrapper/wrapper"
import CardCourse from "~/components/ui-custom/card-course"
import type { Route } from "./+types/index"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}


export default function Home() {
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-[20px] font-bold">Mua càng nhiều, giá sẽ càng rẻ</h1>
          <p className="text-[16px] text-muted-foreground text-center">Nhắn tin cho Được để có giá tốt nếu combo bạn muốn mua không có sẵn</p>
        </div>
        <div className="sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 flex flex-wrap justify-center">
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
        </div>
      </div>
    </Wrapper>
  )
}
