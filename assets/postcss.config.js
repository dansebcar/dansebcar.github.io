const plugins = [
    require('postcss-import'),
    require('postcss-nesting'),
    require('tailwindcss'),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        require('@fullhuman/postcss-purgecss')({
            content: [
                '../**/*.html',
                '**/*.vue',
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        }),
    );
}

module.exports = {
    plugins,
};
