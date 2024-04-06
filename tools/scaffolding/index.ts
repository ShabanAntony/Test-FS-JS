import * as fs from 'fs'
import { join } from 'path'

const isCI = !!process.env.CI
const isEnvExists = fs.existsSync('.env')
const isEnvForUnitTestsExists = fs.existsSync('.env.unit-tests')

if (isCI) {
  // skip execution in CI env
  console.log(`>> SCAFFOLDING: skip '.env' generation because we are using CI`)
} else if (isEnvExists) {
  // skip execution if project already inited
  console.log(
    `>> SCAFFOLDING: skip '.env' generation because it is already setuped`,
  )
} else {
  fs.copyFileSync(
    join(__dirname, 'template.env'),
    join(__dirname, '..', '..', '.env'),
  )
  console.log(`>> SCAFFOLDING: setup '.env' successful`)
}

if (isEnvForUnitTestsExists) {
  // skip execution if project already inited
  console.log(
    `>> SCAFFOLDING: skip '.env.unit-tests' generation because it is already setuped`,
  )
} else {
  fs.copyFileSync(
    join(__dirname, 'template.env.unit-tests'),
    join(__dirname, '..', '..', '.env.unit-tests'),
  )
  console.log(`>> SCAFFOLDING: setup '.env.unit-tests' successful`)
}
