import UpdateCourse from '~/components/course/update-course'
import DragCourse from "~/components/dnd-kit/dnd-kit"
import Lesson from '~/components/lesson/lesson'
import { CourseType } from '~/constants/course.constant'
import type { GetCourseDetailResTypeForAdmin } from '~/types/course.type'

const data: GetCourseDetailResTypeForAdmin = {
  "id": 27,
  "title": "Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online",
  "description": "Mình sẽ hướng dẫn các bạn A-Z về framework Nest.js thông qua dự án API website thương mại điện tử. Ngoài những chức năng cơ bản ai cũng biết, thì các bạn sẽ được học về tích hợp cổng thanh toán, xác thực 2FA, Monorepo, Caching, Permission Based Access Control, Rate Limit, Swagger, xử lý nhiều request cùng đặt hàng,... Mình đã bỏ ra hơn 9 triệu để mua khóa Nest.js của creator Nest.js nên tin mình đi, đây là khóa ngon nhất mà bạn tìm thấy trên internet với mức giá hợp lý nhất.",
  "slug": "Nest.js-Super",
  "price": 1590000,
  "isDraft": true,
  "discount": 0,
  "image": "https://api.edu.duthanhduoc.com/static/documents/a6c5a0870eaa49f9982196d6814a6772.png",
  "video": "https://www.youtube.com/watch?v=gUrMzL-Bafk",
  "courseType": "SINGLE",
  "benefits": [
    "Kỹ năng phân tích và thiết kế Database",
    "Nắm vững Postgresql và Prisma",
    "Biết quy trình thanh toán online và xác thực đơn hàng",
    "Nắm vững Monorepo",
    "Xử lý caching với Redis",
    "Xử lý nhiều request cùng đặt hàng vào 1 thời điểm",
    "Xác thực với JWT và 2FA",
    "Phân quyền Permission Based Access Control"
  ],
  "duration": 33600,
  "chapters": [
    {
      "id": 11,
      "title": "Chương 1: Hướng dẫn tham gia Github và Group hỗ trợ",
      "description": "",
      "order": 0,
      "isDraft": false,
      "duration": 3600,
      "lessons": [
        {
          "id": 23,
          "title": "Bài 1: Hướng dẫn",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 0,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        }
      ]
    },
    {
      "id": 7,
      "title": "Chương 2: Ôn tập JS và TS",
      "description": "",
      "order": 1,
      "isDraft": false,
      "duration": 15600,
      "lessons": [
        {
          "id": 24,
          "title": "Bài 2: JavaScript Class",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n```",
          "order": 0,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": "http://localhost:3000/media/static/videos/849998b2-551e-4a48-a784-27c1d3af1614.mp4"
        },
        {
          "id": 25,
          "title": "Bài 3: Chạy code TypeScript trên Bun, Deno và Node.js",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 1,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        },
        {
          "id": 14,
          "title": "Bài 4: TypeScript Class",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n```",
          "order": 2,
          "isDraft": false,
          "duration": 1200,
          "videoUrl": "http://localhost:3000/media/static/videos/293e2050-6d4f-4f82-9579-53c40ac4187d.mp4"
        },
        {
          "id": 26,
          "title": "Bài 5: Higher Order Function và Depedency Injection",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 3,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        },
        {
          "id": 27,
          "title": "Bài 6: TypeScript Decorator",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 4,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        }
      ]
    },
    {
      "id": 12,
      "title": "Chương 3: Nest.js cơ bản",
      "description": "",
      "order": 2,
      "isDraft": false,
      "duration": 14400,
      "lessons": [
        {
          "id": 28,
          "title": "Bài 7: Giới thiệu Nest Framework",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 0,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        },
        {
          "id": 29,
          "title": "Bài 8: Khám phá bên trong một Nest Application",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 1,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        },
        {
          "id": 30,
          "title": "Bài 9: Làm quen GET POST PUT DELETE",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 2,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        },
        {
          "id": 31,
          "title": "Bài 10: Chỉnh sửa Prettier và Postman để code thuận tiện hơn",
          "description": "# 🧠 Tóm tắt bài học\n\n- Học về Artplayer\n- Thực hành phát video\n- Biết cách tạo menu\n\n## 🔥 Bonus\n\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```\n\\```ts\nclass Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  run() {\n    console.log(`Car ${this.brand} is running...`);\n  }\n}\n\\```",
          "order": 3,
          "isDraft": false,
          "duration": 3600,
          "videoUrl": null
        }
      ]
    },
    {
      "id": 13,
      "title": "Chương 4: Phân tích CSDL dự án Ecommerce",
      "description": "",
      "order": 3,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 14,
      "title": "Chương 5: Chức năng User: Auth",
      "description": "",
      "order": 4,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 15,
      "title": "Chương 6: Chức năng Language",
      "description": "",
      "order": 5,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 16,
      "title": "Chương 7: Prisma Migrate",
      "description": "",
      "order": 6,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 17,
      "title": "Chương 8: Chức năng Role-Permission",
      "description": "",
      "order": 7,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 18,
      "title": "Chương 9: Chức năng Profile",
      "description": "",
      "order": 8,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 19,
      "title": "Chương 10: Chức năng User: Quản lý user",
      "description": "",
      "order": 9,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 20,
      "title": "Chương 11: Chức năng Media",
      "description": "",
      "order": 10,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 21,
      "title": "Chương 12: Chức năng Product",
      "description": "",
      "order": 11,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 22,
      "title": "Chương 13: Chức năng Cart và Order",
      "description": "",
      "order": 12,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 23,
      "title": "Chương 14: Chức năng thanh toán online",
      "description": "",
      "order": 13,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 24,
      "title": "Chương 15: Websocket",
      "description": "",
      "order": 14,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    },
    {
      "id": 25,
      "title": "Chương 16: Nâng cao",
      "description": "",
      "order": 15,
      "isDraft": false,
      "duration": 0,
      "lessons": []
    }
  ],
  "comboChildren": [],
  "createdBy": {
    "id": 1,
    "fullName": "Đinh Viết Huy"
  }
}

export default function CourseDetail() {

  return (
    <div>
      <UpdateCourse data={data} />
      {data.courseType !== CourseType.COMBO &&
        <div className="grid grid-cols-4 p-4">
          <div className="col-span-4 xl:col-span-1 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
            <DragCourse course={data} />
          </div>
          <div className="flex justify-center px-4 mt-10 col-span-4 xl:col-span-3">
            <Lesson />
          </div>
        </div>
      }
    </div >
  )
}