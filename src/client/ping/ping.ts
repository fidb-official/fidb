import { Json } from "../../utils/Json"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function ping(ctx: ClientContext): Promise<Json> {
  const response = await fetch(new URL(`?kind=ping`, ctx.url), {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
