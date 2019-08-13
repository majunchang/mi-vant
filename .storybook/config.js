import { configure, addDecorator } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
import { Button } from 'vant'
import Vue from 'vue'

Vue.use(Button)

const req = require.context('../stories', true, /\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(withNotes)
configure(loadStories, module);
