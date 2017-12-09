import path from 'path'
import test from 'ava'
import execa from 'execa'

const gruntPath = path.resolve(__dirname, '../node_modules/.bin/grunt')

function executeGruntfile(filename) {
  return execa(gruntPath, [
    '--gruntfile',
    path.resolve(__dirname, 'fixtures', filename)
  ])
}

test('grunt pass', async t => {
  const result = await executeGruntfile('grunt-pass-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
})

test('grunt fail', async t => {
  const result = await t.throws(executeGruntfile('grunt-fail-gruntfile.js'))
  t.true(result.failed, 'grunt should fail')
})

test('grunt files', async t => {
  const result = await executeGruntfile('grunt-files-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
  t.true(result.stdout.includes('2 passing', 'should pass 2 tests'))
})

test('grunt options', async t => {
  const result = await executeGruntfile('grunt-options-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
})

test('force option', async t => {
  const result = await executeGruntfile('option-force-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
})

test('files option', async t => {
  const result = await executeGruntfile('option-files-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
  t.true(result.stdout.includes('2 passing', 'should pass 2 tests'))
})

test('missing files', async t => {
  const result = await executeGruntfile('missing-files-gruntfile.js')
  t.false(result.failed, 'grunt should pass')
  t.true(result.stdout.includes('1 passing', 'should pass 1 test'))
})
