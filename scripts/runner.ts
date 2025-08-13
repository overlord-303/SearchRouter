import { register }        from 'esbuild-register/dist/node';
import { Prerender }       from './src/Prerender';
import { bDefault, bangs } from '../src/bangs';
import { __dirname }       from './util';
import path                from 'path';

register();

const engine = new Prerender({
    file: path.resolve(__dirname, '../dist/index.html')
});

engine.inject(
    engine.generateBangsHTML(bDefault, bangs)
);
