export const ACTION = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PATCH: "patch",
};

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  TRASH: "/dashboard/trash",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  MAILTO: "mailto:support@clipps.io",
  getVideoEditPath: (assetId: string) => `/clipp/${assetId}`,
};
