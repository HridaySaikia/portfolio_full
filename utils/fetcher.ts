// utils/fetcher.ts

export const fetcher = async (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};
