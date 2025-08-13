import { register }        from 'esbuild-register/dist/node';
import { Prerender}        from './src/Prerender';
import { bDefault, bangs } from '../src/bangs';
import { __dirname }       from './util';
import path                from 'path';

register();

const dist = path.resolve(__dirname, '../dist');

const engine = new Prerender({
    dist,
    file: path.resolve(dist, 'index.html')
});

engine.inject(
    engine.generateBangsHTML(bDefault, bangs)
);
