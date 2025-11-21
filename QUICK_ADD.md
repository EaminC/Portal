# 快速添加作品指南

## 最简单的方法

### 1. 创建作品文件夹
在 `public/portfolio/主题名/` 下创建新文件夹，例如：
```
public/portfolio/School Bear/新作品名/
```

### 2. 添加两个文件
- `img.jpg` - 你的图片（任何格式的图片，重命名为 img.jpg）
- `des.txt` - 作品描述（纯文本文件）

### 3. 重新生成索引
```bash
node scripts/generate-portfolio.js
```

### 4. 提交到 GitHub
```bash
git add .
git commit -m "添加新作品"
git push
```

完成！Vercel 会自动部署。

## 示例

假设要在 "School Bear" 主题下添加 "School Bear 3"：

```bash
# 1. 创建文件夹
mkdir "public/portfolio/School Bear/School Bear 3"

# 2. 复制图片并重命名
cp your-image.png "public/portfolio/School Bear/School Bear 3/img.jpg"

# 3. 创建描述文件
echo "这是第三个上学小熊作品" > "public/portfolio/School Bear/School Bear 3/des.txt"

# 4. 重新生成索引
node scripts/generate-portfolio.js

# 5. 提交
git add .
git commit -m "Add School Bear 3"
git push
```

就这么简单！
