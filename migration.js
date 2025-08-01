let fs = require('fs');

fs.readdirSync('songs').forEach(file => {
    if (file.endsWith('.md')) {
        let content = fs.readFileSync(`songs/${file}`, 'utf8');
        if (content.includes('layout: song')) return;
        let front = '---\nlayout: song\nlang: ';
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

        front += '\nlink: ' + content[0].split('](')[1].slice(0, -1) + '\n---';

        content = front + '\n' + content.slice(2).join('\n');

        fs.writeFileSync(`songs/${file}`, content);
    }
})