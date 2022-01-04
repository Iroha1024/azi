const fs = require('fs/promises')
const path = require('path')
const { promisify } = require('util')

const exec = promisify(require('child_process').exec)

const sass = require('sass')

const readFile = async (dirPath, pathList = []) => {
  const dirent = await fs.readdir(dirPath, {
    encoding: 'utf-8',
    withFileTypes: true,
  })
  for (const item of dirent) {
    const itemPath = path.join(dirPath, item.name)
    if (item.isFile()) {
      pathList.push(itemPath)
    } else if (item.isDirectory()) {
      await readFile(itemPath, pathList)
    }
  }
  return pathList
}

const compile = (cssPath, output) =>
  exec(`tailwindcss -i ${cssPath} -o ${output}`)

;(async () => {
  const fileList = await readFile(path.join(__dirname, '../src'))
  const cssList = fileList.filter((name) => name.endsWith('.css'))
  for (const file of cssList) {
    const output = file.replace('src', 'es')
    await compile(file, output)
  }
  const scssList = fileList.filter((name) => name.endsWith('.scss'))
  for (const file of scssList) {
    const output = file.replace('src', 'es').replace('scss', 'css')
    const { css } = await sass.compileAsync(file)
    await fs.writeFile(output, css, 'utf-8')
  }
})()
