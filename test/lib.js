import path from 'path'
import fs from 'fs'
import test from 'ava'
import tempy from 'tempy'
import mocha from '../lib/mocha'

function getFixturePath(filename) {
  return path.resolve(__dirname, 'fixtures', filename)
}

test.cb('sanity check', t => {
  mocha(
    {
      files: [getFixturePath('pass.js')],
      quiet: true
    },
    (error, output) => {
      t.ifError(error)
      t.true(output.includes('1 passing'), '1 test should pass')
      t.end()
    }
  )
})

test.cb('mocha pass', t => {
  mocha(
    {
      files: [getFixturePath('pass.js')],
      quiet: true
    },
    error => {
      t.ifError(error, 'mocha should pass')
      t.end()
    }
  )
})

test.cb('mocha fail', t => {
  mocha(
    {
      files: [getFixturePath('fail.js')],
      quiet: true
    },
    error => {
      t.truthy(error, 'mocha should fail')
      t.end()
    }
  )
})

test.cb('set mocha option of type string', t => {
  mocha(
    {
      files: [getFixturePath('pass.js')],
      quiet: true,
      reporter: 'tap'
    },
    (error, output) => {
      t.ifError(error)
      t.true(output.includes('# pass 1'), 'expect 1 pass')
      t.end()
    }
  )
})

test.cb('set mocha option of type bool', t => {
  mocha(
    {
      files: [getFixturePath('fail.js')],
      quiet: true,
      reporter: 'tap',
      bail: true
    },
    (error, output) => {
      t.true(output.includes('# fail 1'), 'expect 1 fail')
      t.end()
    }
  )
})

test.cb('set mocha option of type array', t => {
  mocha(
    {
      files: [getFixturePath('coffeescript.coffee')],
      quiet: true,
      reporter: 'tap',
      compilers: ['coffee:coffee-script/register']
    },
    (error, output) => {
      t.ifError(error)
      t.true(output.includes('# pass 1'), 'expect 1 pass')
      t.end()
    }
  )
})

test.cb('require modules', t => {
  mocha(
    {
      files: [getFixturePath('require.js')],
      quiet: true,
      reporter: 'tap',
      require: ['should']
    },
    (error, output) => {
      t.ifError(error)
      t.true(output.includes('# pass 1'), 'expect 1 pass')
      t.end()
    }
  )
})

test.cb('env option', t => {
  mocha(
    {
      files: [getFixturePath('env.js')],
      quiet: true,
      env: {
        FOO: 'bar'
      }
    },
    error => {
      t.ifError(error)
      t.end()
    }
  )
})

test.cb('save option', t => {
  const outputPath = tempy.file()

  mocha(
    {
      files: [getFixturePath('pass.js')],
      save: outputPath,
      reporter: 'tap'
    },
    error => {
      t.ifError(error)
      const output = fs.readFileSync(outputPath, 'utf8')
      t.true(output.includes('# pass 1'), 'expect 1 pass')
      t.end()
    }
  )
})

test.cb('filesRaw option', t => {
  mocha(
    {
      filesRaw: [getFixturePath('pass*.js')],
      quiet: true,
      reporter: 'tap'
    },
    (error, output) => {
      t.ifError(error)
      t.true(output.includes('# pass 2'), 'expect 2 pass')
      t.end()
    }
  )
})

test.cb('combine files and filesRaw options', t => {
  mocha(
    {
      files: [getFixturePath('fail.js')],
      filesRaw: [getFixturePath('pass*.js')],
      quiet: true,
      reporter: 'tap'
    },
    (error, output) => {
      t.true(output.includes('# fail 1'), 'expect 1 fail')
      t.true(output.includes('# pass 2'), 'expect 2 pass')
      t.end()
    }
  )
})

test.cb('compose reporter options', t => {
  const outputPath = tempy.file()

  mocha(
    {
      files: [getFixturePath('pass.js')],
      quiet: true,
      reporter: 'xunit',
      'reporter-options': {
        output: outputPath
      }
    },
    error => {
      t.ifError(error)
      const output = fs.readFileSync(outputPath, 'utf8')
      t.true(output.includes('<testsuite name='), 'expect testsuite start tag')
      t.true(output.includes('</testsuite>'), 'expect testsuite end tag')
      t.true(output.includes('<testcase'), 'expect testcase tag')
      t.end()
    }
  )
})

test.cb('ignore blank reporter options', t => {
  mocha(
    {
      files: [getFixturePath('pass.js')],
      quiet: true,
      reporter: 'xunit',
      'reporter-options': {}
    },
    error => {
      t.ifError(error)
      t.throws(() => {
        fs.readFileSync(path.resolve(__dirname, 'output.xml'), 'utf8')
      }, /ENOENT/)

      t.end()
    }
  )
})

test.cb('flags option', t => {
  mocha(
    {
      files: [getFixturePath('flags.js')],
      quiet: true,
      flags: ['--harmony']
    },
    error => {
      t.ifError(error)
      t.end()
    }
  )
})
