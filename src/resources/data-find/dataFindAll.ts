import fs from "node:fs"
import { join, resolve } from "node:path"
import { Data, Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"
import { Json } from "../../utils/Json"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { objectMatchProperties } from "../../utils/objectMatchProperties"
import { dataGet } from "../data/dataGet"

export type DataFindAllOptions = {
  properties: Record<string, Json>
}

export async function* dataFindAll(
  db: Database,
  directory: string,
  options: DataFindAllOptions,
): AsyncIterable<Data> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      const path = resolve(join(dirEntry.path, dirEntry.name))
      const parts = path.split("/")
      if (parts.some((part) => part.startsWith("."))) {
        continue
      }

      if (dirEntry.isDirectory()) {
        const data = await dataGet(db, `${directory}/${dirEntry.name}`)
        if (
          data !== undefined &&
          objectMatchProperties(data, options.properties)
        ) {
          yield data
        }
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
