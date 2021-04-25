const exec = require('child_process').exec;

module.exports = async (client) => {
    console.log(`Logged into Discord Successfully!`)
    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    client.user.setActivity(client.config.discord.activity);

    setInterval(() => {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    console.log('Bot is up to date. No changes since last pull.')
                } else {
                    client.channels.cache.get('825827995507490886').send('**[Automatic]** \nNew update on GitHub. Pulling... \n\n Logs: \n```' + response + "```" + "\n\n**Restarting bot**");
                    setTimeout(() => {
                        process.exit();
                    }, 1000)
                }
            }
        })
    }, 10000)
};