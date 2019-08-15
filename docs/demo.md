# Button

### Install

``` javascript
import { Button } from 'vant';

Vue.use(Button);
```

## Usage

### Type
:::demo 默认样式

```html
<mi-vant-button>确认</mi-vant-button>
<mi-vant-button disabled>确认</mi-vant-button>
<mi-vant-button>取消</mi-vant-button>

```


:::demo 禁止
```html
<mi-vant-button>取消11</mi-vant-button>
```


### Loading

```html
<van-button loading type="primary" />
<van-button loading type="primary" loading-type="spinner" />
<van-button loading type="danger" loading-text="Loading..." />
```

| First header | Second header |
| ------------ | ------------- |
| Merged       | Cell 1        |
| ^^           | Cell 2        |
| ^^           | Cell 3        |
|              |               |  |
