// A small syntax highlighter for the JavaScript examples. It only needs to
// handle the code on this page, so it skips everything a full parser would
// do and colors tokens by their shape.

const keywords = new Set([
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'from',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'let',
    'new',
    'of',
    'return',
    'switch',
    'this',
    'throw',
    'try',
    'type',
    'typeof',
    'var',
    'void',
    'while',
    'yield',
]);

const literals = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

const tokenPattern =
    /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|('(?:\\.|[^'\\\n])*'?|"(?:\\.|[^"\\\n])*"?|`(?:\\[\s\S]|[^`\\])*`?)|(\b\d+(?:\.\d+)?(?:e[+-]?\d+)?n?\b)|([A-Za-z_$][\w$]*)|(\s+)|([\s\S])/g;

export const escapeHtml = (text) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (className, text) => `<span class="${className}">${escapeHtml(text)}</span>`;

// Returns the next character that isn't whitespace
const peek = (code, index) => {
    const match = /\S/.exec(code.slice(index));
    return match ? match[0] : '';
};

export const highlight = (code) => {
    let html = '';

    for (const match of code.matchAll(tokenPattern)) {
        const [token, comment, string, number, identifier] = match;
        const end = match.index + token.length;

        if (comment) {
            html += wrap('tok-comment', token);
        } else if (string) {
            html += wrap('tok-string', token);
        } else if (number) {
            html += wrap('tok-number', token);
        } else if (identifier) {
            if (keywords.has(token)) {
                html += wrap('tok-keyword', token);
            } else if (literals.has(token)) {
                html += wrap('tok-literal', token);
            } else if (peek(code, end) === '(') {
                html += wrap('tok-function', token);
            } else if (peek(code, end) === ':' && code[end] !== ':') {
                html += wrap('tok-property', token);
            } else {
                html += escapeHtml(token);
            }
        } else {
            html += escapeHtml(token);
        }
    }

    return html;
};
