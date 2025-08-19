import { register }        from 'esbuild-register/dist/node';
import { Prerender }       from './src/Prerender';
import { bDefault, bangs } from '../src/bangs';
import { EType }           from './src/Error';
import path                from 'path';

import {
    __dirname,
    version,
    branch
} from './util';

register();

try
{
    const engine = new Prerender({
        file:    path.resolve(__dirname, '../dist/index.html'),
        version: version,
        branch:  branch
    });

    engine.inject(
        engine.generateBangsHTML(bDefault, bangs)
    );
}
catch (e: EType | Error | any)
{
    console.log(
        e.toString()
    );
}
