# Button 组件

通用按钮组件。

## 何时使用

向页面插入一个按钮。

## 示例

![示例按钮截图](http://t1.market.xiaomi.com/download/Browser/07c90473d1e33e68991f90e8e4a9b4155144026dc)

```html
<template>
  <Button
      :loading="loading"
      :disabled="!selectedCash"
      @click="clickHandler">立即兑换</Button>
</template>

<script>
import Button from '@/components/Button';

export default {
    name: 'Button',
    components: {
      Button,
    },
    methods: {
      clickHandler() {},
    },
};
</script>
```

## API

Button的属性说明如下：

| 属性        | 说明                            | 类型      | required | 默认值  | 备注                                                          |
| :---------- | :------------------------------ | :-------- | :------- | :------ | :------------------------------------------------------------ |
| loading     | 是否展示loading圆圈             | `Boolean` | `false`  | `false` | -                                                             |
| disabled    | 是否为禁用状态                  | `Boolean` | `false`  | `false` | 设置为true时不会向父组件发送click事件，并修改按钮样式（置灰） |
| customStyle | 自定义样式对象，传入css样式属性 | `Object`  | `false`  | `{}`    | -                                                             |

事件：

| 名称  | 回调参数 | 备注 |
| :---- | :------- | :--- |
| click | 无       | -    |
