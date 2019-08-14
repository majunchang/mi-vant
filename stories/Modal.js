import { storiesOf } from '@storybook/vue';
import miVantModal from '../src/components/Modal/Modal.vue'
import { withStorySource } from '@storybook/addon-storysource'
import modalText from '../docs/modal.md'


storiesOf('miVantModal', module)
  .addDecorator(withStorySource('<mi-vant-modal></mi-vant-modal>'))
  .add('with text', () => {
    return {
      components: { miVantModal },
      template: `
      <mi-vant-modal
      :show="modalShow"
      :msg="modal.msg"
      :close="false"
      :confirm-text="modal.confirmText"
      :cancel-text="modal.cancelText"
    />`,
      data() {
        return {
          modalShow: true,
          msg: "组件库测试1",
          modal: {
            msg: "前往想看APP观看原视频,播放更流畅",
            confirmText: "确定",
            cancelText: "取消"
          }
        };
      },
    }
  },
    {
      notes: modalText
    }
  )



