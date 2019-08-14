import { storiesOf } from '@storybook/vue';
import miVantButton from '../src/components/Button/Button.vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import buttonText from '../readme/button.md'


storiesOf('index', module)
  .addDecorator(withKnobs)
  //  https://www.npmjs.com/package/storybook-readme
  // https://github.com/tuchk4/storybook-readme
  .addParameters({
    readme: {
      content: buttonText,
      sidebar: buttonText
    }
  })
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>{{text}}</mi-vant-button>`,
      props: {
        text: {
          default: text('button-text', '动态修改props传递的数据')
        }
      }
    }
  })


