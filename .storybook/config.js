import { configure } from '@storybook/vue';

function loadStories() {
  require('../stories/Button');
  require('../stories/Modal.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
