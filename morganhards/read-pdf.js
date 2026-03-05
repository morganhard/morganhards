const fs = require('fs');
const { PdfReader } = require('pdfreader');

let fullText = '';
new PdfReader().parseBuffer(fs.readFileSync('E:\\project\\morganhards\\pdf context\\MORGAN RESUME UW MADISON FINAL 3.pdf'), function (err, item) {
    if (err) {
        console.error(err);
    } else if (!item) {
        fs.writeFileSync('temp-resume.txt', fullText);
        console.log("PDF parsed and saved to temp-resume.txt");
    } else if (item.text) {
        fullText += item.text + '\n';
    }
});
