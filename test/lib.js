import path from 'path'
import fs from 'fs'
import test from 'ava'
import tempy from 'tempy'
import mocha from '../lib'

function getFixturePath(filename) {
  return path.resolve(__dirname, 'fixtures', filename)
}

test('sanity check', async t => {
  const output = await mocha({
    files: [getFixturePath('pass.js')],
    quiet: true
  })
  t.true(output.includes('1 passing'), '1 test should pass')
})

test('mocha pass', async t => {
  const output = await mocha({
    files: [getFixturePath('pass.js')],
    quiet: true
  })
  t.true(output.includes('1 passing'), '1 test should pass')
})

test('mocha fail', async t => {
  await t.throws(
    mocha({
      files: [getFixturePath('fail.js')],
      quiet: true
    })
  )
})

test('set mocha option of type string', async t => {
  const output = await mocha({
    files: [getFixturePath('pass.js')],
    quiet: true,
    reporter: 'tap'
  })
  t.true(output.includes('# pass 1'), '1 test should pass')
})

test('set mocha option of type bool', async t => {
  const output = await mocha({
    files: [getFixturePath('pass.js')],
    quiet: true,
    colors: true
  })
  t.true(output.includes('[32m 1 passing'), '1 test should pass with colors')
})

test('set mocha option of type array', async t => {
  const output = await mocha({
    files: [getFixturePath('coffeescript.coffee')],
    quiet: true,
    reporter: 'tap',
    compilers: ['coffee:coffee-script/register']
  })
  t.true(output.includes('# pass 1'), '1 test should pass')
})

test('require modules', async t => {
  const output = await mocha({
    files: [getFixturePath('require.js')],
    quiet: true,
    reporter: 'tap',
    require: ['should']
  })
  t.true(output.includes('# pass 1'), '1 test should pass')
})

test('env option', async t => {
  const output = await mocha({
    files: [getFixturePath('env.js')],
    quiet: true,
    env: {
      FOO: 'bar'
    }
  })
  t.true(output.includes('1 passing'), '1 test should pass')
})

test('save option', async t => {
  const outputPath = tempy.file()
  await mocha({
    files: [getFixturePath('pass.js')],
    save: outputPath,
    reporter: 'tap'
  })
  const output = fs.readFileSync(outputPath, 'utf8')
  t.true(output.includes('# pass 1'), 'expect 1 pass')
})

test('filesRaw option', async t => {
  const output = await mocha({
    filesRaw: [getFixturePath('pass*.js')],
    quiet: true,
    reporter: 'tap'
  })
  t.true(output.includes('# pass 2'), 'expect 2 pass')
})

test('combine files and filesRaw options', async t => {
  const error = await t.throws(
    mocha({
      files: [getFixturePath('fail.js')],
      filesRaw: [getFixturePath('pass*.js')],
      quiet: true,
      reporter: 'tap'
    })
  )
  t.true(error.output.includes('# fail 1'), 'expect 1 fail')
  t.true(error.output.includes('# pass 2'), 'expect 2 pass')
})

test('compose reporter options', async t => {
  const outputPath = tempy.file()
  await mocha({
    files: [getFixturePath('pass.js')],
    quiet: true,
    reporter: 'xunit',
    'reporter-options': {
      output: outputPath
    }
  })
  const output = fs.readFileSync(outputPath, 'utf8')
  t.true(output.includes('<testsuite name='), 'expect testsuite start tag')
  t.true(output.includes('</testsuite>'), 'expect testsuite end tag')
  t.true(output.includes('<testcase'), 'expect testcase tag')
})

test('flags option', async t => {
  const output = await mocha({
    files: [getFixturePath('flags.js')],
    quiet: true,
    flags: ['--harmony']
  })
  t.true(output.includes('1 passing'), '1 test should pass')
})
