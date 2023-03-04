/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['@cbl980226'],
  overrides: [
    {
      files: ['*.vue', '*.ts', '*.js'],
      rules: {}
    }
  ]
}
