import { HTTPMethod, type HttpMethodType } from "~/constants/role.constant"

const methods: {
  label: HttpMethodType,
  color: string
}[] = [
    { label: HTTPMethod.GET, color: "#00b386" },
    { label: HTTPMethod.POST, color: "#ffcb6b" },
    { label: HTTPMethod.PUT, color: "#82aaff" },
    { label: HTTPMethod.PATCH, color: "#c792ea" },
    { label: HTTPMethod.DELETE, color: "#f07178" },
    { label: HTTPMethod.HEAD, color: "#aad94c" },
    { label: HTTPMethod.OPTIONS, color: "#f78c6c" },
  ]

export default function RequestMethod({ method }: { method: HttpMethodType }) {
  const methodData = methods.find((m) => m.label === method)

  if (!methodData) {
    return null
  }

  return (
    <span style={{ color: methodData.color, fontWeight: "bold" }}>
      {methodData.label.toUpperCase()}
    </span>
  )
}