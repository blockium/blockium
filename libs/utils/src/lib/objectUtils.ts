export function removeNullishFields<T extends object>(objParam: T) {
  const obj: T = { ...objParam };
  Object.keys(obj).forEach(
    (k) => (obj as never)[k] == null && delete (obj as never)[k],
  );
  return obj;
}
