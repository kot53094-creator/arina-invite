/**
 * Monkeypatch hostname then run vercel deploy.
 * Avoids Vercel CLI crash on Cyrillic Windows computer names.
 */
import os from 'node:os'
import { spawn } from 'node:child_process'

os.hostname = () => 'PC1'

const child = spawn(
  'npx',
  ['vercel', '--prod', '--yes', ...process.argv.slice(2)],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      COMPUTERNAME: 'PC1',
      USERDOMAIN: 'PC1',
      USERDOMAIN_ROAMINGPROFILE: 'PC1',
      LOGONSERVER: '\\\\PC1',
      CURSOR_WORKSPACE_LABEL: 'arina',
      VSCODE_PROCESS_TITLE: 'node',
    },
    cwd: process.cwd(),
  },
)

child.on('exit', (code) => process.exit(code ?? 1))
