interface Request {
  resource: string | null;
  id: string | null;
  verb: string | null;
}

export const Router = {
  parseRequestURL: () => {
    const url = location.hash.slice(1).toLowerCase() || "/";

    const r = url.split("/");

    const request: Request = {
      resource: null,
      id: null,
      verb: null,
    };

    request.resource = r[0];
    request.id = r[1];
    request.verb = r[2];

    return request;
  },

  sleep: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
};
