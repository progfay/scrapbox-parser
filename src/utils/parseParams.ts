export function parseParams(params: string): Record<string, string> {
  return Object.fromEntries(
    params.split("&").flatMap((param) => {
      if (param === "") return [];
      const index = param.indexOf("=");
      if (index > -1) {
        return [[param.substring(0, index), param.substring(index + 1)]];
      } else {
        return [[param, ""]];
      }
    })
  );
}
