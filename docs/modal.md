# 通用Modal组件

通用modal组件。

## 何时使用

向页面插入一个带有灰色蒙层的对话框

## 示例

![image.png](https://upload-images.jianshu.io/upload_images/5703029-cf52ae80e4752466.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```html
  <template>
    <Modal
            :show="modalShow"
            :msg="modal.msg"
            :confirm-text="modal.confirmText"
            :cancel-text="modal.cancelText"
            @confirm='confirm'
            @cancel='cancel'/>
  </template>

<script>
import Modal from '@/components/Modal';

export default {
    name: 'Demo',
    components: {
      Dialog,
    },
    data() {
      return {
        modalShow: false,
        modal: {
                msg: '前往想看APP观看原视频,播放更流畅',
                confirmText: '确定',
                cancelText: '取消',
            },
      };
    },
    methods: {
     confirm() {
            this.modalShow = false;
			// .....
        },
     cancel() {
            this.modalShow = false;
           // .....
        },
    },
};
</script>
```

## API

Modal的属性说明如下：

| 属性         | 说明                      | 类型          | required | 默认值     | 备注 |
| ------------ | :------------------------ | :------------ | :------- | :--------- | :--- |
| show         | 是否展示对话框            | `Boolean`     | `true`   | `false`    |      |
| title        | 弹窗标题                  | `String`      | `false`  | `''`       | -    |
| msg          | 弹窗文案                  | `String`      | `false`  | `''`       | -    |
| close        | 点击弹框蒙层 是否关闭弹框 | ```Boolean``` | false    | false3     |      |
| confirm-text | 确认按钮文案              | `String`      | `false`  | `''`       | -    |
| cancel-text  | 取消按钮文案              | `string`      | `false`  | `''`       | -    |
| confirm      | 按钮点击处理函数          | `Function`    | `false`  | `() => {}` |      |
| cancel       | 按钮点击处理函数          | `Function`    | `false`  | `() => {}` |      |
