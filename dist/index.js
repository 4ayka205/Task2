#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
function generateQR(text, size, isSmall) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const qrArt = yield qrcode_1.default.toString(text, {
                type: 'terminal',
                small: isSmall,
                scale: size
            });
            console.log(qrArt);
        }
        catch (error) {
            console.error(error instanceof Error ? error.message : 'Неизвестная ошибка');
            process.exit(1);
        }
    });
}
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('generate [text]', 'Генерация QR-кода', (yargs) => {
    return yargs
        .positional('text', {
        describe: 'Текст или URL для кодирования',
        type: 'string',
    })
        .option('size', {
        alias: 'sz',
        type: 'number',
        description: 'Размер QR-кода (1-20)',
        default: 4,
        requiresArg: true
    })
        .option('small', {
        alias: 'sm',
        type: 'boolean',
        description: 'Полноразмерный вывод',
        default: true
    })
        .example([
        ['npm start -- generate "Hello"', 'Стандартный QR-код'],
        ['npm start -- generate "https://example.com" -- --size=8', 'Крупный QR-код'],
        ['npm start -- generate "Test" -- --no-small', 'Полноразмерный вывод']
    ]);
}, (argv) => {
    if (!argv.text) {
        console.error('Ошибка: Укажите текст или ссылку.');
        process.exit(1);
    }
    if (argv.size < 1 || argv.size > 20) {
        argv.size = 4;
        console.warn('Размер должен быть между 1 и 20. Используется значение по умолчанию (4).');
    }
    generateQR(argv.text, argv.size, argv.small);
})
    .strict()
    .help()
    .parse();
