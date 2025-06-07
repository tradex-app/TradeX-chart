import { assert, describe, expect, expectTypeOf, test } from 'vitest'
import LZW from '../src/utils/compression'


describe('class LZW', () => {
  const str = LZW.toString()
  const t1 = LZW.compress(str)
  const t2 = LZW.decompress(t1)

  test(`compressed output is string`, () => {
    assert.isString(t1, `true`)
  })

  test(`decompressed output is string`, () => {
    assert.isString(t2, `true`)
  })

  test(`decompressed === input`, () => {
    expect(t2).toEqual(str)
  })

  test(`compressed.length: ${t1.length} < input.length: ${str.length}`, () => {
    expect(t1.length).toBeLessThan(str.length)
  })
})