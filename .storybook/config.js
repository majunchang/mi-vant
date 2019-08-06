import { configure } from '@storybook/vue';
import { Button } from 'vant'
import Vue from 'vue'

Vue.use(Button)
function loadStories() {
  require('../stories/Button');
  require('../stories/Modal.js');
}

configure(loadStories, module);
