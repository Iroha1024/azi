module.exports = function ({ types: t }) {
  return {
    pre(state) {
      this.hasStyle = /injectStyle/.test(state.code)
      this.hasClass = /injectClass/.test(state.code)
      this.ready =
        state.opts.filename.endsWith('.tsx') && (this.hasStyle || this.hasClass)
    },
    visitor: {
      Program(path) {
        if (!this.ready) return
        const addImport = (local, imported, file) => {
          path.unshiftContainer(
            'body',
            t.ImportDeclaration(
              [t.importSpecifier(t.identifier(local), t.identifier(imported))],
              t.stringLiteral(file)
            )
          )
        }
        addImport('_unref', 'unref', 'vue')
        addImport('_prefixCase', 'prefixCase', '../shared')
      },
      ExpressionStatement(path) {
        if (!this.ready) return
        const callExpression = path.node.expression.callee?.name
        const addVariable = (fnName, variable) => {
          if (callExpression === fnName) {
            path.replaceWith(
              t.variableDeclaration('const', [
                t.variableDeclarator(
                  t.identifier(variable),
                  path.node.expression
                ),
              ])
            )
          }
        }
        addVariable('injectStyle', '_style')
        addVariable('injectClass', '_class')
      },
      ObjectExpression(path) {
        if (!this.ready) return
        if (
          t.isCallExpression(path.parent) &&
          path.parent.callee.name === '_createVNode'
        ) {
          const { properties } = path.node
          const property = properties.find(({ key }) => key.value === 'class')
          if (property) {
            if (property.value.elements) return

            const name = `${property.value.object.name}.${property.value.property.name}`

            const otherProperties = properties.filter(
              ({ key }) => key.value !== 'class'
            )

            const _prefixCase = t.callExpression(t.identifier('_prefixCase'), [
              t.identifier(name),
            ])

            const _class = this.hasClass
              ? t.objectProperty(
                  t.identifier('class'),
                  t.arrayExpression([
                    _prefixCase,
                    t.callExpression(t.identifier('_unref'), [
                      t.identifier(`_class[${name}]`),
                    ]),
                  ])
                )
              : t.objectProperty(t.identifier('class'), _prefixCase)

            const _style = t.objectProperty(
              t.identifier('style'),
              t.callExpression(t.identifier('_unref'), [
                t.identifier(`_style[${name}]`),
              ])
            )

            const list = []
            list.push(...otherProperties, _class)

            if (this.hasStyle) {
              list.push(_style)
            }

            path.replaceWith(t.objectExpression(list))
          }
        }
      },
    },
  }
}
