export function removeNullishFields<T extends object>(objParam: T): T {
  const obj: T = { ...objParam };
  Object.keys(obj).forEach((k) => {
    if ((obj as never)[k] == null) {
      delete (obj as never)[k];
    } else if (typeof (obj as never)[k] === 'object') {
      (obj as never)[k] = removeNullishFields((obj as never)[k]);
    }
  });
  return obj;
}
