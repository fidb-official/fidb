import fs from "node:fs"
import Http from "node:http"
import Https from "node:https"
import { Database } from "../../database"
import { createRequestListener } from "../../server/createRequestListener"
import { serverListenWithDefault } from "../../server/serverListenWithDefault"
import { log } from "../../utils/log"
import { handleDatabase } from "./handleDatabase"

export async function startDatabaseServer(db: Database): Promise<void> {
  const who = "startDatabaseServer"
  const { config } = db

  log({ who, db })

  const listener = createRequestListener({
    ctx: db,
    handle: handleDatabase,
    logger: config.logger,
  })

  if (config.server?.tls) {
    const server = Https.createServer(
      {
        cert: await fs.promises.readFile(config.server.tls.cert),
        key: await fs.promises.readFile(config.server.tls.key),
      },
      listener,
    )
    await serverListenWithDefault(server, config.server)
  } else {
    const server = Http.createServer({}, listener)
    await serverListenWithDefault(server, config.server)
  }
}
