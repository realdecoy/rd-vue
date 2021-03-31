import path from 'path'

export const TEMPLATE_ROOT = path.join(__dirname, '/../../template')
export const TEMPLATE_REPO = 'https://github.com/realdecoy/rdvue-1.0-fixes'
export const TEMPLATE_VERSION = 'main' // replace this with the appropriate release tag in the template repo
export const TEMPLATE_PROJECT_NAME_REGEX = /lyte-shell/g
export const TEMPLATE_CONFIG_FILENAME = 'manifest.json'
export const TEMPLATE_REPLACEMENT_FILES = [
  'package.json',
  '.rdvue/.rdvue',
  'public/index.html',
  'public/manifest.json',
]