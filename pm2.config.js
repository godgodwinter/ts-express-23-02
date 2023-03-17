module.exports = {
    apps: [{
        name: 'be-ts',
        script: 'build/index.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env: {
            NODE_ENV: 'production'
        }
    }]
};