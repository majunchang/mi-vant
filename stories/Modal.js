import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import miVantModal from '../src/components/Modal/Modal.vue'

storiesOf('miVantModal', module)
  .add('with text',
    () => {
      return {
        components: { miVantModal },
        template: `
          <mi-vant-modal
          :show="modalShow"
          :msg="msg"
          :close="false"
          :confirm-text="confirmText"
          :cancel-text="modal.cancelText"
        />`,
        methods: {
          action: action('clicked'),
        }
      }
    },
    {
      notes: 'A very simple component'
    }
  )


