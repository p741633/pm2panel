module.exports = {
    apps: [
        {
            name: 'pm2panel',
            script: './pm2panel.js',
            watch: true,
            ignore_watch: ['morgan', 'iisnode'],
            instances: 1,
            autorestart: false,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
