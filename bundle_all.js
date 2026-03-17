const fs = require('fs');

function bundle(name) {
  let html = fs.readFileSync(`${name}/index.html`, 'utf8');
  const css = fs.readFileSync(`${name}/${name}.css`, 'utf8');
  const js = fs.readFileSync(`${name}/${name}.js`, 'utf8');

  html = html.replace(`<link rel="stylesheet" href="${name}.css">`, `<style>\n${css}\n</style>`);
  html = html.replace(`<script src="${name}.js"></script>`, `<script>\n${js}\n</script>`);
  html = '{% layout none %}\n' + html;

  fs.writeFileSync(`${name}/shopify-${name}.liquid`, html);
  console.log(`Merged into ${name}/shopify-${name}.liquid`);
}

bundle('travel');
bundle('recovery');
bundle('cold-traffic');
