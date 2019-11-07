import { storiesOf } from '@storybook/vue';
import MiVantInput from '../src/components/Input/index.vue';
import MiVantTextarea from '../src/components/Input/textarea.vue';
import { withKnobs, object } from '@storybook/addon-knobs';
import inputText from '../docs/input.md';


storiesOf('input', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: inputText,
    },
  })
  .add(
    'input的使用示例',
    () => {
      return {
        components: { MiVantInput },
        template: `
                    <div  clss='box' style='width:80%;'>
                    <mi-vant-input
                    :label="phone.label"
                    :placeholder="phone.placeholder"
                    v-model='phone.value'
                    :required='phone.required'
                    :valiedate-message="phone.valiedateMessage"
                    :error-status='phone.errorStatus'
                />
                    <mi-vant-input
                    :label="name.label"
                    :placeholder="name.placeholder"
                    v-model='name.value'
                    :disabled='name.disabled'
                    :required='name.required'
                    :valiedate-message="name.valiedateMessage"
                    :error-status='name.errorStatus'
                  />
                </div>
                   `,
        props: {
          phone: {
            default: object('phone', {
              label: '手机号',
              labelKey: 'phone',
              placeholder: '请填写常用手机号码',
              value: '',
              required: true,
              errorStatus: false,
              valiedateMessage: '输入不能为空',
            })
          },
          name: {
            default: object('name', {
              label: '姓名',
              labelKey: 'name',
              placeholder: '请输入用户昵称',
              length: 8,
              value: '',
              disabled: false,
              required: true,
              errorStatus: false,
              valiedateMessage: '输入不能为空',
            })
          },
        },
      };
    },
    {
      notes: {
        markdown: inputText,
      },
    }
  )
  .add(
    'textarea的使用示例',
    () => {
      return {
        components: { MiVantTextarea },
        template: `
                <div style='width:80%'>
                <mi-vant-textarea
                    :label="declaration.label"
                    :label-key="declaration.labelKey"
                    :placeholder="declaration.placeholder"
                    v-model='declaration.value'
                    :length='declaration.length'
                    :required='declaration.required'
                    :valiedate-message="declaration.valiedateMessage"
                    :error-status='declaration.errorStatus'
                />
            </div>`,
        props: {
          declaration: {
            default: object('declaration', {
              label: '合伙人宣言',
              labelKey: 'declaration',
              placeholder: '请介绍一下自己，不少于50字',
              value: '',
              length: 50,
              required: true,
              errorStatus: false,
              valiedateMessage: '输入不能为空',
            })
          },
        },
      };
    },
    {
      notes: {
        markdown: inputText,
      },
    }
  );
