'use strict'
const fs = require('fs')
const path = require('path')
const grunt = require('grunt')

const BOOL_OPTIONS = [
  'allow-uncaught',
  'async-only',
  'bail',
  'check-leaks',
  'colors',
  'delay',
  'exit',
  'forbid-only',
  'forbid-pending',
  'full-trace',
  'growl',
  'inline-diffs',
  'invert',
  'log-timer-events',
  'no-colors',
  'no-deprecation',
  'no-diff',
  'no-timeouts',
  'perf-basic-prof',
  'recursive',
  'sort',
  'throw-deprecation',
  'trace-deprecation',
  'trace',
  'use_strict'
]
const STRING_OPTIONS = [
  'fgrep',
  'grep',
  'opts',
  'reporter',
  'retries',
  'slow',
  'timeout',
  'ui'
]
const ARRAY_OPTIONS = ['globals']

module.exports = function(options) {
  return new Promise((resolve, reject) => {
    let args = []
    const spawnOptions = {
      opts: {
        env: process.env
      }
    }

    spawnOptions.cmd = require.resolve('mocha')
    spawnOptions.cmd = path.dirname(spawnOptions.cmd)
    spawnOptions.cmd += '/../.bin/mocha'

    if (process.platform === 'win32') {
      spawnOptions.cmd += '.cmd'
    }

    if (!options.quiet && !options.save) {
      // Redirect the Mocha output directly to the terminal to maintain colors
      spawnOptions.opts.stdio = 'inherit'
    }

    if (options.env) {
      Object.keys(options.env).forEach(property => {
        spawnOptions.opts.env[property] = options.env[property]
      })
    }

    if (Array.isArray(options.flags)) {
      args = args.concat(options.flags)
    }

    BOOL_OPTIONS.forEach(option => {
      if (options[option]) {
        args.push('--' + option)
      }
    })

    STRING_OPTIONS.forEach(option => {
      if (options[option]) {
        args.push('--' + option)
        args.push(options[option])
      }
    })

    ARRAY_OPTIONS.forEach(option => {
      if (Array.isArray(options[option])) {
        args.push('--' + option)
        args.push(options[option].join(','))
      }
    })

    if (Array.isArray(options.require)) {
      options.require.forEach(requireModule => {
        args.push('--require')
        args.push(requireModule)
      })
    }

    if (options.reporter && options['reporter-options']) {
      const reportOptionsAsString = Object.keys(options['reporter-options'])
        .map(optionName => {
          return optionName + '=' + options['reporter-options'][optionName]
        })
        .join(',')

      if (reportOptionsAsString) {
        args.push('--reporter-options')
        args.push(reportOptionsAsString)
      }
    }

    if (options.files) {
      args = args.concat(options.files)
    }

    if (options.filesRaw) {
      args = args.concat(options.filesRaw)
    }

    spawnOptions.args = args

    grunt.util.spawn(spawnOptions, (error, output) => {
      const combinedOutput = output.stdout + output.stderr

      if (error) {
        error.output = combinedOutput
        return reject(error)
      }

      if (options.save) {
        fs.writeFile(options.save, output.stdout, error => {
          if (error) {
            return reject(error)
          }

          resolve(combinedOutput)
        })
      } else {
        resolve(combinedOutput)
      }
    })
  })
}
