const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

export const bytesToSize = (bytes: number): string => {
  if (bytes == 0) return "0 Byte";
  const index = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return `${Math.round(bytes / Math.pow(1024, index))} ${sizes[index]}`;
};
