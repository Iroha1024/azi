import { Directive } from 'vue'

export const space: Directive<HTMLElement> = (el) => {
  const isText = (node) => node.nodeType === Node.TEXT_NODE
  const isElement = (node) => node.nodeType === Node.ELEMENT_NODE

  const iter = document.createNodeIterator(el, NodeFilter.SHOW_ALL, {
    acceptNode(node) {
      if (node.parentNode !== el) {
        return NodeFilter.FILTER_REJECT
      }
      if (isText(node) && node.nodeValue) {
        return NodeFilter.FILTER_ACCEPT
      }
      if (isElement(node)) {
        return NodeFilter.FILTER_ACCEPT
      }
      return NodeFilter.FILTER_REJECT
    },
  })

  const setClass = (node: Node, ...args: string[]) =>
    (node as HTMLElement).classList.add(...args)

  let node: Node | null
  const nodeList: Node[] = []
  while ((node = iter.nextNode())) {
    nodeList.push(node)
  }

  for (let i = 0; i < nodeList.length; i++) {
    const curr = nodeList[i],
      next = nodeList[i + 1]
    if (isElement(curr) && next) {
      setClass(curr, 'mr-2')
    }
    if (isText(curr) && next) {
      setClass(next, 'ml-2')
    }
  }
}
