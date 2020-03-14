'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs-extra'));
var pluginutils = require('@rollup/pluginutils');
var babel = require('@babel/core');
var shortid = _interopDefault(require('shortid'));

const SCRIPT_IMPORT_NAME = 'createScript';
const REF_IMPORT_NAME = 'createRef';
const SOURCE = '@d4rekanguok/harvest';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escape_re(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replace_var_name(code, { ref_var_name }) {
  const escaped_var_name = escape_re(ref_var_name);
  return code.replace(new RegExp(escaped_var_name, 'gi'), '$elem')
}

function template(code, options) {
  const { generated_id, ref_var_name } = options;
  return `
    (() => {
      const $elems = document.querySelectorAll('[data-ref="${generated_id}"]');
      Array.from($elems).forEach($elem => {
        ${replace_var_name(code, { ref_var_name })}
      });
    })();
  `
}

function has_import(path) {
  const binding = path.scope.getAllBindings()[SCRIPT_IMPORT_NAME];
  return (
    (!!binding)
    && binding.path.parent.type === 'ImportDeclaration'
    && binding.path.parent.source.value === SOURCE
  )
}

function find_import(path, { import_name }) {
  if (path.node.source.value !== SOURCE) return false

  return path.node.specifiers.some(specifier => {
    return specifier.imported.name === import_name
  })
}

function extract_code_as_str(path) {
  // Block statement
  const { start, end } = path.node.arguments[0].body;
  // remove curly brace
  return path.hub.file.code.substring(start + 1, end - 1)
}

function plugin ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          state.generated_id = shortid.generate();
          state.ref_var_name = '';
          state.extracted_chunks = '';
          state.file.metadata = {
            harvest: {
              extracted: ''
            }
          };

          if (!has_import(path)) path.stop();
        },
        exit(_, state) {
          // save extracted code chunks to metadata
          // so rollup can access it
          state.file.metadata.harvest.extracted = state.extracted_chunks;
        }
      },
      ImportDeclaration(path) {
        if (find_import(path, { import_name: SCRIPT_IMPORT_NAME })) path.remove();
      },
      CallExpression(path, state) {
        const { name } = path.node.callee;
        const { generated_id, ref_var_name } = state;

        // handle `createRef`
        if (name === REF_IMPORT_NAME) {
          state.ref_var_name = path.parent.id.name;
          path.replaceWith(
            t.stringLiteral(generated_id)
          );
          path.skip();
        }

        // handle `createScript`
        if (name === SCRIPT_IMPORT_NAME) {
          const code = extract_code_as_str(path);
          const extracted_chunk = template(code, {
            ref_var_name,
            generated_id,
          });
          state.extracted_chunks += extracted_chunk;
          // once `createScript` is removed, we're done
          // with this block of code. Regenerate id
          // Should actually check for the element creation
          state.generated_id = shortid.generate();
          path.remove();
        }
      }
    }
  }
}

const babel_transform = (code) => babel.transformSync(code, {
  plugins: [plugin]
});

function transform(code, options) {
  const { metadata, code: result_code } = babel_transform(code);

  return {
    extracted_chunks: metadata.harvest.extracted,
    code: result_code,
  }
}

function harvest({
  output,
  include,
  exclude,
} = { include: ['**/*.js'], exclude: null }) {
  const filter = pluginutils.createFilter(include, exclude);
  if (typeof output === 'undefined') {
    this.error('Please specify an output path');
  }
  const code_chunks = new Map();

  return {
    name: 'harvest',

    transform: function(code, id) {
      if (!filter(id)) return
      
      const { 
        extracted_chunks, 
        code: result_code 
      } = transform(code);

      if (extracted_chunks === '') return

      code_chunks.set(id, extracted_chunks);

      return { code: result_code }
    },

    generateBundle: async function(options, bundle) {
      let extracted = '';
      code_chunks.forEach((chunk, path) => {
        extracted += `
          /* ${path} */
          ${chunk}
        `;
      });

      try {
        await fs.ensureFile(output);
        await fs.writeFile(output, extracted);
        console.log(`(harvest) Written to ${output}`);
      } catch(err) {
        this.error(err);
      }
    },
  }
}

module.exports = harvest;
