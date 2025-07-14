import { Link } from "react-router";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "~/components/ui/card";

export default function CardCourse({ isBought = false }: { isBought?: boolean }) {
  return (
    <Link to={`/courses/111`}>
      <Card className="pt-0 hover:border-primary transition-colors duration-300 cursor-pointer h-[288px] w-[350px] sm:w-full sm:h-full">
        <CardHeader className="overflow-hidden p-0 h-[200px] relative">
          <CardDescription className="w-full h-full p-0 overflow-hidden">
            {isBought && (
              <Badge variant="default" className="absolute top-1 right-1">
                <p className="text-xs font-medium">Đã mua</p>
              </Badge>
            )}
            <img src="https://edu.duthanhduoc.com/_next/image?url=https%3A%2F%2Fapi.edu.duthanhduoc.com%2Fstatic%2Fdocuments%2F4c5f827fe7664045b6c0c2e03ba55123.png&w=750&q=75" alt="logo" className="w-full h-full object-cover rounded-t-xl" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="m-0 text-base leading-5 tracking-tighter font-bold">[Pre-order] Combo Nest.js Super &amp; Testing &amp; GraphQL</h3>
            </div>
            <div className="flex gap-3 mt-3">
              <p className="tracking-tighter line-through text-muted-foreground">3.170.000&nbsp;₫</p>
              <p className="tracking-tighter font-semibold">1.690.000&nbsp;₫</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}