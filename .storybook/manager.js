import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://sabria.com/icon.svg',
    brandTitle: 'Arrar Sabri Components',
    brandUrl: 'https://sabria.com',
  },
});
