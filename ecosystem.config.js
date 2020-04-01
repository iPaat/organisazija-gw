module.exports = {
    apps: [{
        name  : 'rage-server',
        script: 'server.exe',
        watch : ['./client_packages', './packages'],
    }],
}
