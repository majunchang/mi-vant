import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
import { addReadme } from 'storybook-readme/vue';
import { setOptions } from '@storybook/addon-options'
import { Button } from 'vant'
import Vue from 'vue'

Vue.use(Button)


const req = require.context('../stories', true, /\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

setOptions({
  name: 'mi-Vant',
  url: '#',
  goFullScreen: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: true,
  addonPanelInRight: true,
  sortStoriesByKind: false,
  hierarchySeparator: null,
  hierarchyRootSeparator: null,
  sidebarAnimations: true,
  selectedAddonPanel: undefined,
})

addParameters({
  viewport: { defaultViewport: 'galaxys5' },
})
addDecorator(addReadme);
addDecorator(withNotes)
configure(loadStories, module);
