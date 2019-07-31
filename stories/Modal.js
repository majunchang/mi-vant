import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import miVantModal from '../src/components/Modal/Modal.vue'

storiesOf('miVantModal', module)
  .add('with text', () => {
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
      data() {
        return {
          modalShow: true,
          msg: "组件库测试1",
          confirmText: "确定",
          modal: {
            msg: "前往想看APP观看原视频,播放更流畅",
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


