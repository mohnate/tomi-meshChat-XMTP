/**
 * Returns a human readable file size string.
 *
 * @param bytes - The number of bytes.
 * @param si - Use SI units (KB, MB, GB) instead of binary (KiB, MiB, GiB). Default is false.
 * @param dp - Number of decimal places to display. Default is 1.
 * @returns The human readable file size string.
 */
export const humanFileSize = (bytes: number, si = false, dp = 1) => {
  // Throws error if > 100 MB
  if (bytes > 100000000) {
    throw new Error("File too large!");
  }
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
};
