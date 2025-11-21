# How to Add New Works (添加新作品指南)

## Quick Guide (快速指南)

### Option 1: Add to Existing Theme (添加到现有主题)

1. **Navigate to the theme folder** (进入主题文件夹):
   ```bash
   cd public/portfolio/ThemeName
   ```

2. **Create a new work folder** (创建新的作品文件夹):
   ```bash
   mkdir "New Work Name"
   ```

3. **Add your image** (添加图片):
   ```bash
   # Copy your image and rename it to img.jpg
   cp /path/to/your/image.png "New Work Name/img.jpg"
   # Or use any image editor to save as img.jpg
   ```

4. **Create description file** (创建描述文件):
   ```bash
   echo "Your work description here" > "New Work Name/des.txt"
   # Or edit with your text editor
   ```

5. **Regenerate index** (重新生成索引):
   ```bash
   node scripts/generate-portfolio.js
   ```

6. **Commit and push** (提交并推送):
   ```bash
   git add .
   git commit -m "Add new work: New Work Name"
   git push
   ```

### Option 2: Create New Theme (创建新主题)

1. **Create theme folder** (创建主题文件夹):
   ```bash
   mkdir -p "public/portfolio/New Theme Name"
   ```

2. **Add works to the theme** (在主题中添加作品):
   Follow steps 2-4 from Option 1, but inside the new theme folder.

3. **Regenerate index** (重新生成索引):
   ```bash
   node scripts/generate-portfolio.js
   ```

4. **Commit and push** (提交并推送):
   ```bash
   git add .
   git commit -m "Add new theme: New Theme Name"
   git push
   ```

## Detailed Steps (详细步骤)

### Step-by-Step Example (逐步示例)

Let's say you want to add a new work called "Pixel Art 3" to the "School Bear" theme:

**1. Create the work folder:**
```bash
mkdir "public/portfolio/School Bear/Pixel Art 3"
```

**2. Add your image:**
- Place your image file in the folder
- Rename it to `img.jpg`
- Supported formats: JPG, PNG (will be converted/renamed to img.jpg)

**3. Create description:**
Create a file named `des.txt` with your description:
```
This is a new pixel art piece featuring a school bear character.
The design uses vibrant colors and maintains the retro gaming aesthetic.
Perfect for educational games and school-themed applications.
```

**4. Regenerate the portfolio index:**
```bash
node scripts/generate-portfolio.js
```

You should see output like:
```
✅ portfolio.json generated successfully!
   Found 2 theme(s) with 5 total work(s)
   - Gingerbread Man: 2 work(s)
   - School Bear: 3 work(s)  ← Your new work is here!
```

**5. Test locally (optional):**
```bash
npm run dev
```
Visit http://localhost:3000 to see your new work.

**6. Deploy to production:**
```bash
git add .
git commit -m "Add new work: Pixel Art 3"
git push
```

Vercel will automatically deploy your changes!

## File Structure Requirements (文件结构要求)

Each work folder **must** contain:

- ✅ `img.jpg` - Your work image (required)
- ✅ `des.txt` - Your work description (required)

```
public/portfolio/
└── Theme Name/
    └── Work Name/
        ├── img.jpg    ← Required
        └── des.txt    ← Required
```

## Image Tips (图片提示)

- **Format**: Any image format (PNG, JPG, etc.) - just rename to `img.jpg`
- **Size**: Recommended to keep under 5MB for faster loading
- **Dimensions**: No specific requirements, but square or landscape works best
- **Naming**: Must be exactly `img.jpg` (lowercase)

## Description Tips (描述提示)

- **Format**: Plain text file (`.txt`)
- **Length**: Any length you want
- **Encoding**: UTF-8 (supports English and other languages)
- **Line breaks**: Use regular line breaks, they will be preserved

## Current Structure (当前结构)

```
public/portfolio/
├── Gingerbread Man/
│   ├── Gingerbread Man 1/
│   │   ├── img.jpg
│   │   └── des.txt
│   └── Gingerbread Man 2/
│       ├── img.jpg
│       └── des.txt
└── School Bear/
    ├── School Bear 1/
    │   ├── img.jpg
    │   └── des.txt
    └── School Bear 2/
        ├── img.jpg
        └── des.txt
```

## Troubleshooting (故障排除)

### Work doesn't appear after adding?
1. Make sure you ran `node scripts/generate-portfolio.js`
2. Check that both `img.jpg` and `des.txt` exist
3. Refresh your browser (hard refresh: Cmd+Shift+R or Ctrl+Shift+R)

### Image not showing?
1. Check file name is exactly `img.jpg` (not `img.JPG` or `image.jpg`)
2. Verify the image file is not corrupted
3. Check browser console for errors

### Description not loading?
1. Make sure `des.txt` file exists
2. Check file encoding is UTF-8
3. Verify file has content (not empty)

## Quick Commands Reference (快速命令参考)

```bash
# Add new work to existing theme
mkdir "public/portfolio/ThemeName/WorkName"
cp image.png "public/portfolio/ThemeName/WorkName/img.jpg"
echo "Description" > "public/portfolio/ThemeName/WorkName/des.txt"
node scripts/generate-portfolio.js
git add . && git commit -m "Add work" && git push

# Create new theme with first work
mkdir -p "public/portfolio/NewTheme/FirstWork"
cp image.png "public/portfolio/NewTheme/FirstWork/img.jpg"
echo "Description" > "public/portfolio/NewTheme/FirstWork/des.txt"
node scripts/generate-portfolio.js
git add . && git commit -m "Add theme" && git push
```

## After Adding Works (添加作品后)

1. ✅ Run `node scripts/generate-portfolio.js` to update the index
2. ✅ Test locally with `npm run dev` (optional)
3. ✅ Commit and push to GitHub
4. ✅ Vercel will automatically deploy your changes
5. ✅ Your new work will appear on the live site!

