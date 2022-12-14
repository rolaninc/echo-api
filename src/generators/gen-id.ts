import { v4 as uuidv4 } from 'uuid'
import cuid from 'cuid'

const genUIKey = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 10)

const genCUID = (): string => cuid()

const genUUID = (): string => uuidv4()

export { genUIKey, genCUID, genUUID }
