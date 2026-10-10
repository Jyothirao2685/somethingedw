import urllib.request
import re

c = urllib.request.urlopen('https://adroitco.in/assets/index-BYs3NPUl.js').read().decode('utf-8')

# Find Bv definition
matches = [m.start() for m in re.finditer(r'Bv\s*=', c)]
print('Bv matches:', len(matches))
for idx in matches:
    print('--- Match at', idx, '---')
    print(c[idx:idx+1500])
    print('\n')

# Also search for how .content is rendered
matches_content = [m.start() for m in re.finditer(r'\.content', c)]
for idx in matches_content:
    snippet = c[max(0, idx-100):min(len(c), idx+200)]
    if 'dangerouslySetInnerHTML' in snippet or 'split' in snippet or 'whitespace-pre' in snippet or 'paragraph' in snippet:
        print('--- Content render snippet ---')
        print(snippet)
