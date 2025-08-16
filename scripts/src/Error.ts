type Object = { [k: string|number]: any };

const INSPECT = typeof Symbol !== 'undefined' ? (Symbol.for && Symbol.for('nodejs.util.inspect.custom')) : undefined;

export type EType = Error;
export default class Error extends globalThis.Error
{
    public readonly code?:  string | number;
    public readonly cause?: unknown;

    private _data: Map<string, any> = new Map();

    constructor(message?: string, opts?: { name?: string, code?: string | number; cause?: unknown; data?: Object })
    {
        // @ts-ignore - 'cause' is supported.
        super(message, { cause: opts?.cause });

        this.name = opts?.name ?? new.target?.name ?? 'Error';

        if (opts)
        {
            this.code  = opts?.code;
            this.cause = opts?.cause;

            if (opts.data) this.addData('data', opts.data);
        }

        Error.captureStackTrace(this, new.target ?? Error);
    }

    /**
     * Add one or more data entries.
     * - addData('k', v) => sets key
     */
    public addData(key: string, value: any): this
    {
        this._data.set(key, value);
        return this;
    }

    public getData<T = any>(key?: string): T | Record<string, any> | undefined
    {
        if (key) return this._data.get(key);

        const out: { [k: string]: any } = {};

        for (const [k, v] of this._data.entries()) out[k] = v;
        return out;
    }

    public toJSON(): Object
    {
        return {
            name:    this.name,
            message: this.message,

            code:    this.code,
            data:    this.getData(),

            stack:   this.stack,
            cause:   this._normalizeCause(this.cause)
        };
    }

    /**
     * String form includes name & message. Use .stack for details.
     */
    public override toString(): string
    {
        return `${this.name }${this.message ? ': ' + this.message + ';' : ''}` + (this.code !== undefined ? ` { code: ${this.code} }` : '');
    }

    /** Node util.inspect customisation so console.error prints the data bag too. */
    public [INSPECT as unknown as PropertyKey]?(depth: number, opts: any): any
    {
        // prefer the plain object representation
        return this.toJSON();
    }

    private _normalizeCause(cause: unknown): { name: string, message: string, stack?: string } | unknown
    {
        return cause instanceof Error
            ? { name: cause.name, message: cause.message, stack: cause.stack }
            : cause;
    }
}
