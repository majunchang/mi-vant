import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import miVantButton from '../src/components/Button/Button.vue'
import { withStorySource } from '@storybook/addon-storysource'
import buttonText from '../docs/button.md'

const simpleSourceCode = '<mi-vant-button>storyBook</mi-vant-button>'
storiesOf('miVantButton', module)
  .addDecorator(withKnobs)
  .addDecorator(withStorySource(simpleSourceCode))
  .addParameters({
    readme: {
      sidebar: buttonText,
    },
  })
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


