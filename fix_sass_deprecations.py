import re
from pathlib import Path

root = Path('css/style.scss')
text = root.read_text(encoding='utf-8')
new_text = re.sub(r'@import\s+"([^"]+)";', '@use "\1" as *;', text)
if '@use "sass:color"' not in new_text:
    if new_text.startswith('---'):
        parts = new_text.split('---', 2)
        if len(parts) >= 3:
            new_text = '---' + parts[1] + '---\n@use "sass:color" as color;\n' + parts[2].lstrip('\n')
        else:
            new_text = '@use "sass:color" as color;\n' + new_text
    else:
        new_text = '@use "sass:color" as color;\n' + new_text
root.write_text(new_text, encoding='utf-8')
print(f'Updated {root}')

scss_root = Path('_scss')
pattern_lighten = re.compile(r'lighten\(\s*([^,]+?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)')
pattern_darken = re.compile(r'darken\(\s*([^,]+?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)')
for path in sorted(scss_root.rglob('*.scss')):
    text = path.read_text(encoding='utf-8')
    if 'lighten(' in text or 'darken(' in text:
        original = text
        if '@use "sass:color"' not in text:
            lines = text.splitlines(True)
            insert_idx = 0
            while insert_idx < len(lines) and (lines[insert_idx].strip().startswith('//') or lines[insert_idx].strip() == ''):
                insert_idx += 1
            lines.insert(insert_idx, '@use "sass:color" as color;\n')
            text = ''.join(lines)
        text = pattern_lighten.sub(r'color.adjust(\1, $lightness: \2%)', text)
        text = pattern_darken.sub(r'color.adjust(\1, $lightness: -\2%)', text)
        if text != original:
            path.write_text(text, encoding='utf-8')
            print(f'Patched {path}')
