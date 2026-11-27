import { expect, test } from 'vitest'
import { decodeSourceURL, encodeSourceURL } from '../utils'

test.each([
  '/app/with space/file.ts',
  '/app/a%20b/file.ts',
  '/app/a%20 b/file.ts',
  '/app/a%2F b/file.ts',
  '/app/a%25 b/file.ts',
  '/app/a%09 b/file.ts',
  '/app/%E2%82%AC file.ts',
  '/app/100% complete/file.ts',
  '/app/a%zz b/file.ts',
  '/app/a%\u3000b/file.ts',
  '/app/a\tb/file.ts',
  '/app/normal.ts',
])('round-trips the source URL for %s', (id) => {
  const encoded = encodeSourceURL(id)
  expect(encoded).not.toMatch(/\s/)
  expect(decodeSourceURL(encoded)).toBe(id)
})

test('does not decode unrelated percent-encoded characters', () => {
  expect(decodeSourceURL('/app/a%2Fb.ts')).toBe('/app/a%2Fb.ts')
})
