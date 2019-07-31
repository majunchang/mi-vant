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
  mounted() {
    let ket = "111";
    console.log(this.props);
    console.log(this._props);
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

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999999;
}

.modal__content {
  background-color: #fff;
  border-radius: 10px;
}

.modal__close {
  width: 30px;
  height: 30px;
  margin: 7px 7px -7px auto;
  background-size: 12px 12px;
  background-position: center center;
}

.modal-footer {
  display: flex;
  justify-content: center;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  margin: 0 auto;
}

.modal__msg {
  margin: 0 10px 25px 10px;
  width: 250px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}

.modal__msg h1 {
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
  margin: 0;
}

.modal__msg p {
  margin: 19px auto 0 auto;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
