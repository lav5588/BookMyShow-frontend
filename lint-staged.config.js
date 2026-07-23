// lint-staged.config.js
export default {
    'src/**/*.{ts,tsx}': 'eslint --fix',
    '*.{ts,tsx,js,jsx,json,css,md,yml,yaml}': 'prettier --write',
};
