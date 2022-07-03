export const ACTION = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
};

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  VIDEO: "/video",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  MAILTO: "mailto:support@clipps.io",
  getVideoPublicLink: (assetId: string) => `/w/${assetId}`,
  getVideoEditPath: (assetId: string) => `/video/${assetId}`,
};
