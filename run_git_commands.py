import subprocess
import os
import sys

# Set working directory
os.chdir(r'c:\Users\c.andreotti\OneDrive - Accenture\lead scoring prototipo')

print(f'Working directory: {os.getcwd()}')
print('=' * 80)

# Command 1: git add
print('\n[1] Running: git add index.html netlify/functions/leads.js netlify/functions/package.json')
print('-' * 80)
result1 = subprocess.run(
    ['git', 'add', 'index.html', 'netlify/functions/leads.js', 'netlify/functions/package.json'],
    capture_output=True,
    text=True
)
print(f'Return code: {result1.returncode}')
if result1.stdout:
    print(f'STDOUT:\n{result1.stdout}')
if result1.stderr:
    print(f'STDERR:\n{result1.stderr}')
if result1.returncode == 0:
    print('✓ git add succeeded')

# Command 2: git commit
print('\n[2] Running: git commit -m "feat: shared persistence via Netlify Blobs..."')
print('-' * 80)
commit_message = """feat: shared persistence via Netlify Blobs, remove Settings/Export UI

- Add netlify/functions/leads.js: GET/POST handler using @netlify/blobs
- Add netlify/functions/package.json with @netlify/blobs dependency
- index.html: remove SettingsModal, export button, settings state
- index.html: load leads from /.netlify/functions/leads on mount (Netlify)
- index.html: POST new lead to function on save (shared across all users)
- index.html: localStorage fallback for local dev

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"""

result2 = subprocess.run(
    ['git', 'commit', '-m', commit_message],
    capture_output=True,
    text=True
)
print(f'Return code: {result2.returncode}')
if result2.stdout:
    print(f'STDOUT:\n{result2.stdout}')
if result2.stderr:
    print(f'STDERR:\n{result2.stderr}')
if result2.returncode == 0:
    print('✓ git commit succeeded')

# Command 3: git push
print('\n[3] Running: git push origin main')
print('-' * 80)
result3 = subprocess.run(
    ['git', 'push', 'origin', 'main'],
    capture_output=True,
    text=True
)
print(f'Return code: {result3.returncode}')
if result3.stdout:
    print(f'STDOUT:\n{result3.stdout}')
if result3.stderr:
    print(f'STDERR:\n{result3.stderr}')
if result3.returncode == 0:
    print('✓ git push succeeded')

print('\n' + '=' * 80)
print('All commands completed!')
print(f'Summary - Add: {result1.returncode}, Commit: {result2.returncode}, Push: {result3.returncode}')
sys.exit(max(result1.returncode, result2.returncode, result3.returncode))
