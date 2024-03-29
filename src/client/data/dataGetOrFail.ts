import { Data } from "../../database"
import { ClientContext } from "../ClientContext"
import { checkResponse } from "../checkResponse"

export async function dataGetOrFail(
  ctx: ClientContext,
  path: string,
): Promise<Data> {
  const response = await fetch(new URL(path, ctx.url), {
    method: "GET",
    headers: {
      authorization: ctx.authorization,
    },
  })

  checkResponse(ctx, response)

  return await response.json()
}
