# Air UI CLI

## 安装

```bash
npm install -g @air-ui/cli
```

## 使用

### 初始化项目

```bash
air init my-project
```

### 添加组件

```bash
air add component
```

### 发布组件

```bash
air publish component
```

## 更新

使用以下命令检查更新并安装最新版本：

```bash
npm show @air-ui/cli version
npm install -g @air-ui/cli
```
```

### 6. 代码注释
在关键部分添加注释，以便其他开发者能够快速理解代码的意图。

```typescript
// src/commands/add.ts
async function createComponent(answers: Answers) {
    logger.info('正在加载模板...'); // 提示用户正在加载模板
    // ... 其他代码
}
```

### 7. 测试覆盖
确保为 CLI 工具编写单元测试，确保功能的正确性和稳定性。

通过以上改进，你的 CLI 工具将更加健壮、用户友好，并且易于维护。