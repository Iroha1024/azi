import { Directive } from 'vue'

export const wrapTextNode: Directive<HTMLElement> = (el) => {
  const iter = document.createNodeIterator(el, NodeFilter.SHOW_TEXT)
  let node: Node | null
  const textNodeList: Node[] = []
  while ((node = iter.nextNode())) {
    if (node.nodeValue) {
      textNodeList.push(node)
    }
  }
  textNodeList.forEach((node) => {
    const text = document.createElement('span')
    text.textContent = node.nodeValue
    if (node.parentNode === el) {
      el.replaceChild(text, node)
    }
  })
}
