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
  PRIVACY: "/privacy",
  TERMS: "/terms",
  MAILTO: "mailto:support@clipps.io",
  getVideoEditPath: (assetId: string) => `/clipp/${assetId}`,
};
