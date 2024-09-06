// 定义生成组件时的选项
export type GenerateOptions = {
    path?: string; // 生成组件的目标路径
    packageName?: string; // 包名
    version?: string; // 版本号
    description?: string; // 描述
    template?: string; // 使用的模板名称
    useTailwindCSS?: boolean;
    componentLibrary?: string;
};

// 定义生成器上下文，包含生成组件所需的所有信息
export type GeneratorContext = {
    path: string; // 生成路径
    name: string; // 组件名称
    packageName: string; // 包名
    version: string; // 版本号
    description: string; // 描述
    useTailwindCSS?: boolean;
    componentLibrary?: string;
};

// 定义组件导出的结构
export type ComponentExports = {
    path: string; // 导出路径
    modules: Array<{ name: string; type?: boolean }>; // 导出的模块列表
};

// 定义模板函数的类型
export type TemplateFunction = (
    context: GeneratorContext // 接收生成器上下文作为参数
) =>
    | false
    | {
          // 返回 false 或一个对象
          filename: string; // 生成的文件名
          contents: string; // 文件内容
          exports?: ComponentExports['modules']; // 可选的导出信息
      };
