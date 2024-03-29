import { normalize } from "node:path"
import { Database } from "./Database"
import { resolvePath } from "./resolvePath"

export function normalizePath(db: Database, path: string): string {
  const resolvedPath = resolvePath(db, path)
  const prefix = normalize(db.directory + "/")
  return resolvedPath.slice(prefix.length)
}
