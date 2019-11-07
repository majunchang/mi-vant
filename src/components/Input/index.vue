<template>
  <div>
    <input
      :class="['mi-vant-input', error ? 'mi-vant-input-error' : '']"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="inputMsg"
      @blur="inputBlur"
    />
    <p v-if="error" class="mi-vant-input-error-msg">{{ errorMsg }}</p>
  </div>
</template>

<script>
import { checkID, checkPhone } from "../utils/validateInput";
import Textarea from "./textarea";

let obj = {};
const InputVue = {
  name: "mi-vant-input",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    labelKey: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      required: true,
      default: null
    },
    length: {
      type: Number,
      default: 0
    },
    valiedateMessage: {
      type: String,
      default: ""
    },
    type: {
      // name, idNumber,phone,address, job
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    hanleValidate: {
      type: Function
    },
    errorStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      errorMsg: ""
    };
  },
  watch: {
    errorStatus(v) {
      this.error = v || false;
    },
    valiedateMessage(v) {
      this.errorMsg = v || "";
    }
  },
  methods: {
    inputMsg(e) {
      const value = e.target.value;
      this.validate(value);
      this.$emit("input", value);
    },
    inputBlur(e) {
      const value = e.target.value;
      if (this.hanleValidate) {
        const result = this.hanleValidate(value);
        this.error = !result.validate;
        this.errorMsg = result.valiedateMessage;
      } else {
        switch (this.type) {
          case "idNumber":
            if (!checkID(value)) {
              this.error = true;
              this.errorMsg = this.label
                ? `${this.label}输入有误，请检查！`
                : "输入有误，请检查";
            }
            break;
          case "phone":
            if (!checkPhone(value)) {
              this.error = true;
              this.errorMsg = this.label
                ? `${this.label}输入有误，请检查！`
                : "输入有误，请检查";
            }
            break;
          default:
            this.error = this.error;
            this.errorMsg = this.errorMsg;
        }
      }
      if (this.length && value && value.length < this.length) {
        this.error = true;
        this.errorMsg = this.label
          ? `${this.label}输入不能少于${this.length}个字`
          : `输入不能少于${this.length}个字`;
      }

      obj = {
        value,
        error: this.error,
        labelKey: this.labelKey
      };
      this.$emit("onBlur", obj);
      this.$emit("getFieldsError", this.error, this.labelKey);
    },
    validate(value) {
      if (!value && this.required) {
        this.error = true;
        this.errorMsg = this.label
          ? `${this.label}输入不能为空`
          : "输入不能为空";
        return;
      }
      this.error = false;
    }
  }
};

InputVue.miVantTextarea = Textarea;
export default InputVue;
</script>

<style lang="less">
@import "../less/index.less";
.mi-vant-input {
  width: 100%;
  margin-top: 7px;
  padding: 11px;
  font: 14px/19px miui;
  background-color: #f4f4f4;
  border-radius: 3px;
  border: none;
  outline: none;
}

.mi-vant-input-error {
  border: 1px solid #f5222d;
}

.mi-vant-input-error-msg {
  font: 14px/19px miui;
  color: #f5222d;
  margin-top: 2px;
}

.mi-vant-input::placeholder {
  color: #cecece;
}

.mi-vant-input:disabled {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
  background: #f5f5f5;
}
</style>
