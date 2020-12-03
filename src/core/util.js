export function CreateCallbackName(name) {
  return 'on' + name.charAt(0).toUpperCase() + name.slice(1)
}
