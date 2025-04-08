import { expect, test } from 'vitest'
import Tools from '.'
import { isArrayOfType } from '../utils/typeChecks'

test('class static Tools.list to be an array of objects',() => {
  expect(ToolsRegister()).toBe(true)
})

function ToolsRegister() {
  Tools.register()
  return isArrayOfType(Tools.list, "object")
}
