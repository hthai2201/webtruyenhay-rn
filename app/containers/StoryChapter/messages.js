/*
 * Welcome Messages
 *
 * This contains all the text for the Welcome container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Home';

export default defineMessages({
  hello: {
    id: `${scope}.hello`,
    defaultMessage: 'Hello from',
  },
});
