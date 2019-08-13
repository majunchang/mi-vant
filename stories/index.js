import { storiesOf } from '@storybook/vue';
import miVantButton from '../src/components/Button/Button.vue'



storiesOf('index', module)
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>storyBook</mi-vant-button>`,
      data() {
        return {
          name: '11'
        }
      }
    }
  }
  )


