import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import miVantButton from '../src/components/Button/Button.vue'
import { Button } from 'vant'

storiesOf('Button', module)
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>storyBook</mi-vant-button>`,
      data() {
        return {
          name: 'aa'
        }
      }
    }
  }
  )

storiesOf('Button', module)
  .add('111', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>storyBook</mi-vant-button>`,
      data() {
        return {
          name: 'aa'
        }
      }
    }
  }
  )

