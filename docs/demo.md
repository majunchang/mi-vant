# Button

### 安装



``` javascript
import { Button } from 'vant';

Vue.use(Button);
```



## 使用

### Type
:::demo 默认样式

```html
<mi-vant-button>确认</mi-vant-button>

<mi-vant-button>取消</mi-vant-button>

```
:::


:::demo 禁用

```html
<mi-vant-button disabled>确认</mi-vant-button>
```

:::


:::demo 禁用

```html
<template>
  <div class="demo-block-container">
    <mi-vant-modal
      show
      msg="百川东到海，何时复西归"
      close
      confirm-text="确认"
      cancel-text="取消"
    />
  </div>

</template>
<script>

   export default {
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

</script>
```

:::



- 1
- 2
- 3



> props属性

| 名称  | 回调参数 | 备注  |
| :---- | :------- | :---- |
| click | 无       | 12312 |
