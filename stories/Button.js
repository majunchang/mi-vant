import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import miVantButton from '../src/components/Button/Button.vue'
import { withStorySource } from '@storybook/addon-storysource'
import buttonText from '../docs/button.md'

storiesOf('miVantButton', module)
  .addDecorator(withStorySource('<mi-vant-button>storyBook</mi-vant-button>'))
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>storyBook</mi-vant-button>`,
    }
  },
    {
      notes: {
        markdown: buttonText
      }
    }
  )


