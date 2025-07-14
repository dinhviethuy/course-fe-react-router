import Wrapper from "~/components/layouts/client/wrapper/wrapper";
import CardCourse from "~/components/ui-custom/card-course";

export default function BoughtCourses() {
  return (
    <Wrapper className="py-8">
      <div className="flex flex-col gap-8">
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-6 flex flex-wrap justify-center ">
          <CardCourse isBought />
          <CardCourse isBought />
          <CardCourse isBought />
          <CardCourse isBought />
          <CardCourse isBought />
        </div>
      </div>
    </Wrapper>
  )
}