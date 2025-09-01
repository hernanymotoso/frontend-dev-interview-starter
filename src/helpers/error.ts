export function extractErrorMessage(string: string) {
  const [code, json] = string.split(/:(.+)/).map((str) => str.trim());
  const parsedCode = parseInt(code, 10);
  if (isNaN(parsedCode)) return null;
  const data = JSON.parse(json);
  return data?.error?.message || null;
}
