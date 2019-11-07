## input的使用

主要用于数据收集、校验和提交功能的表单

## textarea的使用

>textarea 和input的使用方法和传递属性完全一致，故不再赘述。

#### textarea和input的引入方式

```js
import {MiVantInput} from 'miVant';
const MiVantTextarea = MiVantInput.MiVantTextarea;
```



### 何时使用

- 用于创建一个实体或收集信息
- 需要对输入的数据进行校验



### 代码演示

#### 效果展示


:::demo 禁用

  ```html
<template>
<div class="form">
            <div class="form-item">
                <label for="name">姓名:</label>
                <mi-vant-input
                    :label="form.name.label"
                    :label-key="form.name.labelKey"
                    :placeholder="form.name.placeholder"
                    v-model='form.name.value'
                    :required='form.name.required'
                    :valiedate-message="form.name.valiedateMessage"
                    :error-status='form.name.errorStatus'
                    @getFieldsError="errorCollect"
                />
            </div>
            <div class="form-item">
                <label for="telephone">手机号:</label>
                <mi-vant-input
                    :label="form.phone.label"
                    :label-key="form.phone.labelKey"
                    :placeholder="form.phone.placeholder"
                    v-model='form.phone.value'
                    :required='form.phone.required'
                    :valiedate-message="form.phone.valiedateMessage"
                    :error-status='form.phone.errorStatus'
                    :hanle-validate='hanleValidate'
                    @getFieldsError="errorCollect"
                />
            </div>
            <div class="form-item">
                <label for="telephone">我的梦想:</label>
                <mi-vant-textarea
                    :label="form.dream.label"
                    :label-key="form.dream.labelKey"
                    :placeholder="form.dream.placeholder"
                    v-model='form.dream.value'
                    :required='form.dream.required'
                    :valiedate-message="form.dream.valiedateMessage"
                    :error-status='form.dream.errorStatus'
                    @getFieldsError="errorCollect"
                />
            </div>
            <div class="form-item">
                <label for="telephone">合伙人宣言:</label>
                <mi-vant-textarea
                    :label="form.declaration.label"
                    :label-key="form.declaration.labelKey"
                    :placeholder="form.declaration.placeholder"
                    v-model='form.declaration.value'
                    :length='form.declaration.length'
                    :required='form.declaration.required'
                    :valiedate-message="form.declaration.valiedateMessage"
                    :error-status='form.declaration.errorStatus'
                    @getFieldsError="errorCollect"
                />
            </div>
        </div>
</template>

<script>


	export default {
     data() {
        return {
            form: {
                name: {
                    label: '姓名',
                    labelKey: 'name',
                    placeholder: '请填写真实姓名',
                    value: '',
                    required: true,
                    errorStatus: false,
                    valiedateMessage: '输入不能为空',
                },
                phone: {
                    label: '手机号',
                    labelKey: 'phone',
                    placeholder: '请填写常用手机号码',
                    value: '',
                    required: true,
                    errorStatus: false,
                    valiedateMessage: '输入不能为空',
                },
                dream: {
                    label: '我的梦想',
                    labelKey: 'dream',
                    placeholder: '小目标还是要有的，万一平台帮你实现了呢~',
                    value: '',
                    required: true,
                    errorStatus: false,
                    valiedateMessage: '输入不能为空',
                },
                declaration: {
                    label: '合伙人宣言',
                    labelKey: 'declaration',
                    placeholder: '请介绍一下自己，不少于50字',
                    length: 50,
                    value: '',
                    required: true,
                    errorStatus: false,
                    valiedateMessage: '输入不能为空',
                },
            },
        };
    },
    methods:{
       hanleValidate(value) {
            if (!/^1[0-9]{10}$/.test(value)) {
                return {
                    validate: false,
                    valiedateMessage: '手机号输入有误！',
                };
            }
            return {
                validate: true,
                valiedateMessage: '',
            };
        },
        errorCollect(err, name) {
            this.form[name].errorStatus = err;
        },
      	check() {
            console.log(this.form);
            const keys = Object.keys(this.form);
            keys.forEach((item) => {
                if (!this.form[item].value) {
                    this.form[item].errorStatus = true;
                    this.form[item].valiedateMessage = `${this.form[item].label}输入不能为空`;
                }
            });
            if (keys.find(item => this.form[item].errorStatus === true)) {
                return;
            }
            this.submit();
        },
    }
  }
</script>

<style>
.form {
    width: 300px;
    font-size: 16px;
}
</style>
```

:::






###  报错信息默认为红色，在这里被md的样式覆盖了 正常使用不影响
### 注意事项：

-  input 内置了组件非空的校验，设置required为true即可
- 内置了输入长度的校验
- 支持自定义校验等
-  引入textarea组件的方式
- 上面的示例中 需要注意check方法
  - 校验非空，当用户不触发组件的输入和失焦事件，直接submit的时候 需要增加这样的一条判断
  - 输入组件存在错误的时候，进行提交。  不同于react的函数式组件，在这里 通过getFieldsError，将子组件传递给父组件 进而影响到data中的值，通过对数据进行筛选 可以判断当前是否存在错误



### api

| 属性             | 说明                         | 类型     | 默认值 | 备注                 |
| ---------------- | ---------------------------- | -------- | :----: | -------------------- |
| label            | 对应的label，                | String   |   ''   | 用于非空校验提示     |
| labelKey         | 对应form表单的中的key值      | String   |   ''   | 父组件收集错误       |
| value            | 表单值                       | String   |   ''   |                      |
| length           | 输入长度限制                 | Number   |   0    | 表单失去焦点后校验   |
| valiedateMessage | 自定义错误信息               | String   |   ''   |                      |
| type             | 内置校验组件，idNumber,phone | String   |   ''   | 目前有身份证和手机号 |
| placeholder      | value为空的提示文案          | String   |   ''   |                      |
| required         | 组件是否进行非空校验         | Boolean  | false  |                      |
| hanleValidate    | 传入自定义校验函数           | Function | 空函数 |                      |
| errorStatus      | 传入错误状态                 | Boolean  | false  |                      |





### method

| 方法           | 说明                                                                                                                    | 类型     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| blur           | 失去焦点之后触发，对象形式的参数，<br />包含当前组件的value，error状态，labelKey                                        | function |
| input          | v-model指令中包含了 @input的指令<br /> v-model的绑定是实时传递组件值的  如果使用value，需要注意父组件中的值             | function |
| getFieldsError | 父组件收集子组件内部的错误，输入组件在失去焦点后，会将当前组件的错误状态和labelKey传递给父组件  用于父组件提交时的check | function |

