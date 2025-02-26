export function minifyHtml(html: string): string {
    return html
        .replace(/\s+/g, ' ') // 将多个空白字符替换为单个空格
        .replace(/>\s+</g, '><') // 删除标签之间的空白
        .replace(/<!--.*?-->/g, '') // 删除注释
        .trim(); // 删除首尾空白
}
