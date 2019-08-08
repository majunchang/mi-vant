import { storiesOf } from '@storybook/vue';
import miVantModal from '../src/components/Modal/Modal.vue'
import miVantButton from '../src/components/Button/Button.vue'



storiesOf('miVantButton', module)
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



storiesOf('miVantModal', module)
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
      methods: {
        confirm() {
          this.modalShow = false;
          console.log("点击确认按钮");
        },
        concel() {
          this.modalShow = false;
          console.log("点击取消按钮");
        }
      }
    }
  }
  )
