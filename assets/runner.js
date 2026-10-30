// Runs the examples in a worker, so an endless loop in an edited example
// can't freeze the page. The page terminates the worker if an example takes
// too long.

/* global geolib */
let loadError = null;

try {
    importScripts('https://cdn.jsdelivr.net/npm/geolib@4/dist/geolib.iife.js');
    // Makes every function available without the geolib. prefix
    Object.assign(self, geolib);
} catch (error) {
    loadError = error;
}

const identifierPattern = /^[A-Za-z_$][\w$]*$/;
const maxInlineLength = 64;

// Formats a value like it would be written in JavaScript
const format = (value, depth = 0, seen = new WeakSet()) => {
    if (value === null) {
        return 'null';
    }

    switch (typeof value) {
        case 'undefined':
            return 'undefined';
        case 'number':
            return Object.is(value, -0) ? '-0' : String(value);
        case 'bigint':
            return `${value}n`;
        case 'string':
            return JSON.stringify(value);
        case 'boolean':
        case 'symbol':
            return String(value);
        case 'function':
            return `[Function ${value.name || 'anonymous'}]`;
    }

    if (seen.has(value)) {
        return '[Circular]';
    }

    if (value instanceof RegExp) {
        return String(value);
    }

    if (value instanceof Date) {
        return `Date(${value.toISOString()})`;
    }

    if (value instanceof Promise) {
        return 'Promise {}';
    }

    seen.add(value);

    const isArray = Array.isArray(value);
    const entries = isArray
        ? value.map((item) => format(item, depth + 1, seen))
        : Object.entries(value).map(
              ([key, item]) =>
                  `${identifierPattern.test(key) ? key : JSON.stringify(key)}: ${format(item, depth + 1, seen)}`
          );

    seen.delete(value);

    const [open, close] = isArray ? ['[', ']'] : ['{', '}'];

    if (entries.length === 0) {
        return open + close;
    }

    const inline = isArray ? `[${entries.join(', ')}]` : `{ ${entries.join(', ')} }`;

    if (!inline.includes('\n') && inline.length + depth * 4 <= maxInlineLength) {
        return inline;
    }

    const indent = '    '.repeat(depth + 1);
    return `${open}\n${entries.map((entry) => indent + entry).join(',\n')},\n${'    '.repeat(depth)}${close}`;
};

const formatError = (error) =>
    error instanceof Error ? `${error.name}: ${error.message}` : `Uncaught ${format(error)}`;

self.onmessage = ({ data: { id, code } }) => {
    if (loadError) {
        postMessage({
            id,
            status: 'error',
            message: 'Geolib could not be loaded from cdn.jsdelivr.net. Check your connection and reload the page.',
            logs: [],
        });
        return;
    }

    const logs = [];
    const log = (...args) => {
        logs.push(args.map((arg) => (typeof arg === 'string' ? arg : format(arg))).join(' '));
    };
    console.log = console.info = console.warn = console.error = console.debug = log;

    try {
        // Indirect eval returns the value of the last expression. `void 0`
        // keeps the "use strict" directive from becoming the result of code
        // that only declares variables.
        const value = (0, eval)(`'use strict'; void 0;\n${code}`);
        postMessage({ id, status: 'ok', result: format(value), logs });
    } catch (error) {
        postMessage({ id, status: 'error', message: formatError(error), logs });
    }
};

postMessage({ status: 'ready' });
