#!/usr/bin/env node
import qrcode from 'qrcode';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

async function generateQR(text: string, version: number, isSmall: boolean): Promise<void> {
  try {
    const qrArt = await qrcode.toString(text, {
      type: 'terminal',
      small: isSmall,
      version: version
    });
    console.log(qrArt);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    process.exit(1);
  }
}

const argv = yargs(hideBin(process.argv))
  .command(
    'generate [text]',
    'Генерация QR-кода',
    (yargs) => {
      return yargs
        .positional('text', {
          describe: 'Текст или URL для кодирования',
          type: 'string',
        })
        .option('version', {
          alias: 'v',
          type: 'number',
          description: 'Версия QR-кода (1-40)',
          default: 4,
          requiresArg: true
        })
        .option('small', {
            alias: 's',
            type: 'boolean',
            description: 'Полноразмерный вывод',
            default: true
        })
        .example([
          ['npm start -- generate "Hello"', 'Стандартный QR-код'],
          ['npm start -- generate "https://example.com" -- --version=8', 'QR-код версии 8'],
          ['npm start -- generate "Test" -- --no-small', 'Полноразмерный вывод']
        ]);
    },

    (argv) => {
      if (!argv.text) {
        console.error('Ошибка: Укажите текст или ссылку.');
        process.exit(1);
      }
      if (argv.version < 1 || argv.version > 40) {
        argv.size = 4;
        console.warn('Размер должен быть между 1 и 40. Используется значение по умолчанию (4).');
      }
      generateQR(argv.text, argv.version, argv.small);
    }
  )
  .strict()
  .help()
  .parse();