# Button 按钮

Button 组件用于触发操作或事件，如提交表单、打开对话框等。

## 基础用法

使用 `type` 属性来定义 Button 的样式。

:::demo
vue
<template>
<a-button>默认按钮</a-button>
<a-button type="primary">主要按钮</a-button>
<a-button type="success">成功按钮</a-button>
<a-button type="info">信息按钮</a-button>
<a-button type="warning">警告按钮</a-button>
<a-button type="danger">危险按钮</a-button>
</template>
:::

## 禁用状态

使用 `disabled` 属性来控制按钮是否为禁用状态。

:::demo
vue
<template>
<a-button disabled>禁用按钮</a-button>
<a-button type="primary" disabled>禁用主要按钮</a-button>
</template>
:::

## 按钮尺寸

使用 `size` 属性设置按钮大小，可选值为 `large`、`default` 或 `small`。

:::demo
vue
<template>
<a-button size="small">小型按钮</a-button>
<a-button>默认按钮</a-button>
<a-button size="large">大型按钮</a-button>
</template>
:::

## 圆角按钮

设置 `round` 属性为 `true` 来使用圆角按钮。

:::demo
vue
<template>
<a-button round>圆角按钮</a-button>
<a-button type="primary" round>主要圆角按钮</a-button>
</template>
:::

## 加载中状态

使用 `loading` 属性来显示加载中状态。

:::demo
vue
<template>
<a-button type="primary" loading>加载中</a-button>
</template>
:::

## 自定义颜色

使用 `color` 属性来自定义按钮颜色。

:::demo
<template>
<a-button color="#626aef">自定义颜色</a-button>
</template>
:::

## API

### 属性

| 参数        | 说明               | 类型               | 可选值                                                | 默认值  |
| ----------- | ------------------ | ------------------ | ----------------------------------------------------- | ------- |
| size        | 尺寸               | string             | large / default / small                               | default |
| type        | 类型               | string             | default / primary / success / warning / info / danger | default |
| disabled    | 是否禁用状态       | boolean            | —                                                     | false   |
| round       | 是否圆角按钮       | boolean            | —                                                     | false   |
| loading     | 是否加载中状态     | boolean            | —                                                     | false   |
| loadingIcon | 自定义加载图标组件 | string / Component | —                                                     | Loading |
| color       | 按钮背景颜色       | string             | —                                                     | —       |

### 事件

| 事件名称 | 说明           | 回调参数            |
| -------- | -------------- | ------------------- |
| click    | 点击按钮时触发 | (event: MouseEvent) |

### 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
