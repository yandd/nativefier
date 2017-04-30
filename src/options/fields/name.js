import log from 'loglevel';
import { inferTitle } from './../../infer';
import { DEFAULT_APP_NAME } from './../../constants';

export default function ({ name, targetUrl }) {
  // .length also checks if its the commanderJS function or a string
  if (name && name.length > 0) {
    return name;
  }
  return inferTitle(targetUrl)
    .then(pageTitle => (pageTitle || DEFAULT_APP_NAME))
    .catch((error) => {
      log.warn(`Unable to automatically determine app name, falling back to '${DEFAULT_APP_NAME}'. Reason: ${error}`);
      return DEFAULT_APP_NAME;
    });
}
