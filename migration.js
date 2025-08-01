let fs = require('fs');

fs.readdirSync('translations').forEach(file => {
    if (file.endsWith('.md')) {
        let content = fs.readFileSync(`translations/${file}`, 'utf8');
        if (content.includes('layout: translation')) return;
        else if (content.split('](').length > 2) console.log('Skipping', file);

        let front = '---\nlayout: translation\ntrans:\n    ';
        content = content.split('\n');
        if (content[0].startsWith('[Japanese'))
            front += 'ja';
        else if (content[0].startsWith('[English'))
            front += 'en';
        else if (content[0].startsWith('[French'))
            front += 'fr';
        else if (content[0].startsWith('[Vietnamese'))
            front += 'vi';
        else throw new Error(`Unknown language in ${file}`);

        front += ': ' + content[0].split('](')[1].slice(0, -1) + '\n---';

        content = front + '\n#' + content.slice(1).join('\n');

        fs.writeFileSync(`translations/${file}`, content);
    }
})