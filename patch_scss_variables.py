from pathlib import Path

root = Path('d:/buwifi/buwifi')
count = 0
for path in sorted(root.glob('_scss/**/*.scss')):
    text = path.read_text(encoding='utf-8')
    if '@use "variables"' in text:
        continue
    lines = text.splitlines(True)
    insert_index = 0
    while insert_index < len(lines) and (lines[insert_index].strip().startswith('//') or lines[insert_index].strip() == ''):
        insert_index += 1
    lines.insert(insert_index, '@use "variables" as *;\n')
    path.write_text(''.join(lines), encoding='utf-8')
    print('patched', path)
    count += 1
print('total patched', count)
