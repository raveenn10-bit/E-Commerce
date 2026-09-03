const fs = require("fs");
const path = require("path");

const root = "src";

const replacements = [
  { from: /Sweet Moon/g, to: "Apex Moon" },
  { from: /SWEET MOON/g, to: "APEX MOON" },
  { from: /sweet-moon-classic-gift-box/g, to: "apex-moon-classic-gift-box" },
  { from: /sweet-moon-luxury-hamper/g, to: "apex-moon-luxury-hamper" },
  { from: /sweet-moon-korean-lover-box/g, to: "apex-moon-korean-lover-box" },
  { from: /sweetmoon\.lk/g, to: "apexmoon.lk" },
  { from: /076 608 9763/g, to: "077 066 3154" },
  { from: /0766089763/g, to: "0770663154" },
  { from: /94766089763/g, to: "94770663154" },
  { from: /077 690 3192/g, to: "077 066 3154" },
  { from: /0776903192/g, to: "0770663154" },
  { from: /No 01 Main Street \(New Street\), Galle 80000, Sri Lanka/g, to: "No. 88 Moonlit Boulevard, Colombo 03, Sri Lanka" },
  { from: /No 01 Main Street, Galle/g, to: "No. 88 Moonlit Boulevard, Colombo 03" },
  { from: /No\. 01 Main Street, Galle/g, to: "No. 88 Moonlit Boulevard, Colombo 03" },
  { from: /Main Street, Galle/g, to: "Moonlit Boulevard, Colombo 03" },
  { from: /Galle 80000/g, to: "Colombo 03" },
  { from: /Galle Boutique/g, to: "Colombo Boutique" },
  { from: /Main\+Street\+Galle/g, to: "Colombo+03" },
  { from: /Sweet\+Moon/g, to: "Apex\+Moon" },
  { from: /orders@sweetmoon\.lk/g, to: "orders@apexmoon.lk" },
  { from: /support@sweetmoon\.lk/g, to: "support@apexmoon.lk" },
  { from: /info@sweetmoon\.lk/g, to: "contact@apexmoon.lk" },
  { from: /Sweet\s*<span className="text-champagne">Moon<\/span>/g, to: "Apex <span className=\"text-champagne\">Moon</span>" },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      processDir(full);
    } else if (/\.(tsx|ts|js|jsx|json|css|md)$/.test(file)) {
      let content = fs.readFileSync(full, "utf8");
      let original = content;
      for (const r of replacements) {
        content = content.replace(r.from, r.to);
      }
      if (content !== original) {
        fs.writeFileSync(full, content, "utf8");
        console.log("Updated: " + full);
      }
    }
  }
}

processDir(root);
console.log("Completed rebranding replacement!");
