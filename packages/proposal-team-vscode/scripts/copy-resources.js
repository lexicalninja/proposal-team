/**
 * Stage shared resources into ./resources for the VS Code extension.
 *
 * A VS Code extension can only read files inside its own directory, so
 * agents, templates, and writing standards are copied from the repo root
 * at build time. `resources/` is generated and gitignored — the repo root
 * stays the single source of truth.
 */
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '..', '..');
const RESOURCES_ROOT = path.join(PACKAGE_ROOT, 'resources');

const COPIES = [
    { src: 'agents', dest: 'agents' },
    { src: 'templates', dest: 'templates' },
    { src: 'writing-standards.md', dest: 'writing-standards.md' },
];

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const child of fs.readdirSync(src)) {
            copyRecursive(path.join(src, child), path.join(dest, child));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

fs.rmSync(RESOURCES_ROOT, { recursive: true, force: true });
fs.mkdirSync(RESOURCES_ROOT, { recursive: true });

let failed = false;

for (const { src, dest } of COPIES) {
    const srcPath = path.join(REPO_ROOT, src);
    const destPath = path.join(RESOURCES_ROOT, dest);

    if (!fs.existsSync(srcPath)) {
        console.error(`✗ Missing shared resource: ${srcPath}`);
        failed = true;
        continue;
    }

    copyRecursive(srcPath, destPath);
    console.log(`✓ ${src} → resources/${dest}`);
}

if (failed) {
    console.error('✗ Resource staging failed.');
    process.exit(1);
}

console.log('✓ Resources staged from repo root.');
