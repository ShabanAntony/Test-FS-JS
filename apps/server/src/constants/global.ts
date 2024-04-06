// eslint-disable-next-line @nx/enforce-module-boundaries
import packageConfig from '../../../../package.json'

export const port = 8080
export const host = `http://localhost:${port}`
export const globalPrefix = packageConfig.name
export const apiPrefix = `${globalPrefix}/api`
export const swaggerPrefix = `${globalPrefix}/swagger`
