export default () => {
  return typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString()
}
