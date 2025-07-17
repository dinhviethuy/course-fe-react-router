import type { Route } from ".react-router/types/app/routes/client/courses/+types/course";
import { BrainCircuit, CheckIcon, ListVideo } from "lucide-react";
import { Link } from "react-router";
import VideoIframe from "~/components/art-player/video-iframe";
import NotFound from "~/components/error-page/error-page";
import Wrapper from "~/components/layouts/client/wrapper/wrapper";
import Loading from "~/components/loading/loading";
import CardCourse from "~/components/ui-custom/card-course";
import CollapsibleCustom from "~/components/ui-custom/collapsible-custom";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardDescription } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useGetCourseDetailBySlugQuery } from "~/hooks/useCourse";
import { cn, formatCurrency, formatDate } from "~/lib/utils";

export default function Course({ params }: Route.ComponentProps) {
  const { courseSlug } = params
  const { data: courseDetail, isPending, isError } = useGetCourseDetailBySlugQuery({ slug: courseSlug })
  const courseDetailData = courseDetail?.data
  if (isPending) return <Loading />
  if (!courseDetailData || isError) return <NotFound statusCode={404} message="Không tìm thấy trang" />;
  const { price, discount, title, createdBy: author, benefits, chapters, updatedAt, video, description } = courseDetailData.data
  return (
    <Wrapper>
      <div className="flex flex-col xl:gap-12 gap-6 xl:py-0 py-8">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tighter">{title}</h1>
          <div className="flex gap-8">
            <span className="text-base">Bởi: {author?.fullName}</span>
            <span className="text-base">Cập nhật: {formatDate(updatedAt)}</span>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-8 lg:col-span-7 h-[550px]">
            {video && <VideoIframe videoUrl={video} />}
          </div>
          <div className="col-span-12 xl:col-span-4 lg:col-span-5 h-[550px]">
            <Card className="w-full p-6">
              <CardDescription className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold line-through">{formatCurrency(price)}</span>
                  <div className={cn("flex gap-8 items-center", {
                    "hidden": !discount
                  })}>
                    <span className="text-2xl font-semibold dark:text-white text-black">{formatCurrency(price * (1 - discount / 100))}</span>
                    <Badge variant="default" className="text-xs h-10">
                      <span className="text-base">Tiết kiệm {discount}%</span>
                    </Badge>
                  </div>
                </div>
                <ul className="flex flex-col gap-2 text-base dark:text-white text-black my-4">
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Mua 1 lần, học trọn đời</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Cập nhật khóa học liên tục</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Video chất lượng 1080p, 1440p</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Học trên mọi thiết bị</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Group hỏi đáp với mentor</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Hỗ trợ fix bug khi học</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <CheckIcon className="w-4 h-4" />
                    <span>Cung cấp doc, source code Github tập đầy đủ</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-4">
                  <Button className="w-full h-10 cursor-pointer">
                    <span className="text-base font-semibold">Mua ngay</span>
                  </Button>
                  <Link to="/learn/Nest.js-Testing">
                    <Button className="w-full h-10 cursor-pointer">
                      <span className="text-base font-semibold">Tham gia học</span>
                    </Button>
                  </Link>
                  <Button className="w-full h-10 cursor-pointer" variant="outline">
                    <span className="text-base font-semibold dark:text-white text-black">Thêm vào giỏ hàng</span>
                  </Button>
                </div>
              </CardDescription>
            </Card>
          </div>
        </div>
        <div className="grid xl:grid-cols-16 lg:grid-cols-16 md:grid-cols-16 grid-cols-1 gap-8 md:gap-0">
          <div className="xl:col-span-14 lg:col-span-14 md:col-span-12 col-span-1">
            <p className="xl:text-2xl text-xl">{description}</p>
          </div>
          <div className="xl:col-span-2 lg:col-span-2 md:col-span-4 col-span-1">
            <div className="flex flex-col gap-4 items-center xl:items-end">
              <Avatar className="w-25 h-25">
                <AvatarImage src="https://github.com/shadcn.png" className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold">{author?.fullName}</span>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultValue="learning" orientation="horizontal">
            <TabsList className="w-full h-10 md:justify-center md:flex hidden" >
              <TabsTrigger value="learning" className="cursor-pointer dark:data-[state=active]:bg-black">Nội dung học tập</TabsTrigger>
              <TabsTrigger value="author" className="cursor-pointer dark:data-[state=active]:bg-black">Về tác giả</TabsTrigger>
              <TabsTrigger value="related" className="cursor-pointer dark:data-[state=active]:bg-black">Khóa học liên quan</TabsTrigger>
            </TabsList>
            <TabsList className="h-10 w-full md:hidden">
              <TabsTrigger value="learning" className="cursor-pointer dark:data-[state=active]:bg-black">
                Nội dung học tập
              </TabsTrigger>
            </TabsList>
            <TabsList className="h-10 w-full md:hidden">
              <TabsTrigger value="author" className="cursor-pointer dark:data-[state=active]:bg-black">
                Về tác giả
              </TabsTrigger>
            </TabsList>
            <TabsList className="h-10 w-full md:hidden ">
              <TabsTrigger value="related" className="cursor-pointer dark:data-[state=active]:bg-black">
                Khóa học liên quan
              </TabsTrigger>
            </TabsList>
            <TabsContent value="learning" className="mt-4 flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                  <BrainCircuit className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Bạn sẽ nhận được</h3>
                </div>
                <ul className="grid grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="col-span-1 flex gap-2 items-center">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex gap-2 items-center">
                  <ListVideo className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Nội dung học tập</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {chapters.map((chapter, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                      <CollapsibleCustom chapter={chapter} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="author" className="mt-4">
              <p className="text-xl">Mình sẽ giúp bạn level up skill 🚀 lên nhanh nhất có thể
                Được hiện là một Front-End developer với hơn 4 năm kinh nghiệm làm việc thực tế. Năm 20 tuổi, mình đã viết một ứng dụng đầu tiên trong 4 giờ và nhanh chóng giúp mình kiệm được 1000$ chỉ trong 3 ngày sau đó.</p>
            </TabsContent>
            <TabsContent value="related" className="mt-4">
              <div className="sm:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-6 flex flex-wrap justify-center">
                <CardCourse />
                <CardCourse />
                <CardCourse />
                <CardCourse />
                <CardCourse />

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div >
    </Wrapper >
  )
}