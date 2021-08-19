import { program, Command } from 'commander';
import path from 'path';

import { buildAsync } from './commands/build';
import { initAsync } from './commands/init';
import { watchAsync } from './commands/watch';
import { defaultConfig } from './shared';

program.version('0.0.1');
program.name('expo-stories');

const initCommand = new Command();

initCommand
  .name('start')
  .option(
    '-p --projectRoot <path>',
    'the directory where the RN stories app will run',
    process.cwd()
  )
  .option('-w --watchRoot <path>', 'the directory to search for .stories files', process.cwd())
  .option('--no-watch', 'disable watching source file changes', false)
  .action(async options => {
    const config = {
      ...defaultConfig,
      ...options,
    };

    config.watchRoot = path.resolve(process.cwd(), config.watchRoot);

    await initAsync(config);
    await buildAsync(config);

    if (options.w) {
      await watchAsync(config);
    }
  });

program.addCommand(initCommand);
program.parse(process.argv);
