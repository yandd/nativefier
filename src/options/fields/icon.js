import { inferIcon } from './../../infer';

export default function ({ icon, targetUrl, platform }) {
  // Icon is the path to the icon
  if (icon) {
    return icon;
  }

  return inferIcon(targetUrl, platform);
}
