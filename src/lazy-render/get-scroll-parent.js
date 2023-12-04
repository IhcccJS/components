const overflowStylePatterns = ['scroll', 'auto', 'overlay'];

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.nodeType === ELEMENT_NODE_TYPE;
}

export function getScrollParent(el, root) {
  let node = el;

  while (node && node !== root && isElement(node)) {
    if (node === document.body) {
      return root;
    }
    const { overflowY } = window.getComputedStyle(node);
    if (
      overflowStylePatterns.includes(overflowY)
      // && node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
}
