import { deleteSync } from 'del';
import { TaskFunction, TaskFunctionCallback } from 'gulp';
import { spawn, SpawnOptions } from 'child_process';
import { platform } from 'os';

export function cleanTask(patterns: string | string[]): TaskFunction {
  return (done: TaskFunctionCallback) => {
    deleteSync(patterns);
    done();
  };
}

export function execTask(
  binPath: string,
  args: string[] = [],
  env = {}
): TaskFunction {
  return (done: TaskFunctionCallback) => {
    // 旧 hack：包一层守卫，避免在某些 Node 版本抛异常
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout as any)?._handle?.setBlocking?.(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr as any)?._handle?.setBlocking?.(true);
    } catch {}

    const isWin = platform() === 'win32';
    // Win 下显式补 .cmd（如果你传进来的是 npm / npx 也建议补）
    const needsCmd = isWin && !/\.(cmd|bat|exe)$/i.test(binPath);
    const bin = needsCmd ? `${binPath}.cmd` : binPath;

    // 过滤非法/空参数，避免 EINVAL
    const safeArgs = (args || []).filter((a) => a != null && a !== '');

    const opts: SpawnOptions = {
      env: { ...process.env, ...env },
      cwd: process.cwd(),
      stdio: 'inherit',
      // 关键：Win 下让 .cmd/.bat 经 shell 执行，规避 EINVAL
      shell: isWin,
    };

    // 便于排查
    console.log('[execTask]', {
      bin,
      args: safeArgs,
      cwd: opts.cwd,
      shell: opts.shell,
    });

    const childProcess = spawn(bin, safeArgs, opts);

    childProcess.on('error', (err) => done(err));
    childProcess.on('close', (code: number) => {
      code !== 0 ? done(new Error(`Process failed with code ${code}`)) : done();
    });
  };
}
