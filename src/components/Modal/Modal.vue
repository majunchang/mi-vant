<template>
  <transition name="fade">
    <div v-if="show" class="modal" @click.self="closeModal">
      <div class="modal__content">
        <slot>
          <div class="modal__inner">
            <div class="modal__msg">
              <h1 v-if="title">{{ title }}</h1>
              <slot name="msg">
                <p v-html="msg" />
              </slot>
              <van-button type="danger">危险按钮</van-button>
            </div>
            <div class="modal-footer">
              <Button :customStyle="cancelbtnStyle" @click="onCancel">{{ cancelText }}</Button>
              <Button :customStyle="confirmbtnStyle" @click="onConfirm">{{ confirmText }}</Button>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import "./style/index.less";
import Button from "../Button/Button";

const buttonStyle = {
  background: "#fff",
  height: "30px",
  fontSize: "14px",
  flex: "1",
  margin: 0
};
export default {
  name: "mi-vant-modal",
  components: {
    Button
  },
  data() {
    return {
      confirmbtnStyle: {
        color: this.confirmColor,
        ...buttonStyle
      },
      cancelbtnStyle: {
        color: this.cancelColor,
        ...buttonStyle
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    },
    close: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    confirmColor: {
      type: String,
      default: "#eb4940"
    },
    cancelColor: {
      type: String,
      default: "#d9d9d9"
    },
    confirm: {
      type: Function,
      default: () => {}
    },
    cancel: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    closeModal() {
      if (this.close) {
        this.$emit("cancel");
      }
    },
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
    stopSlide(e) {
      e.preventDefault();
    }
  },
  watch: {
    show(v) {
      if (v) {
        document.body.addEventListener("touchmove", this.stopSlide, {
          passive: false
        });
      } else {
        document.body.removeEventListener("touchmove", this.stopSlide, {
          passive: false
        });
      }
    }
  },
  destroyed() {
    document.body.removeEventListener("touchmove", this.stopSlide, {
      passive: false
    });
  }
};
</script>
