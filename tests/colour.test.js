// colou.test.js

import { describe, expect, test } from 'vitest'
import Colour from '../src/utils/colour'


describe(`class Colour`, () => {

  const t1 = new Colour('#123456')
  console.log(t1.value)


  test(`instantiate class`, () => {
    expect(t1).toBeInstanceOf(Colour)
  })

  test(`instance.value is Object`, () => {
    expect(t1.value).toBeTypeOf("object")
    expect(t1.value.r).toBe(18)
    expect(t1.value.g).toBe(52)
    expect(t1.value.b).toBe(86)
  })

})


