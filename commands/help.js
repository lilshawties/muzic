/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands and bot information.'),

  async execute(interaction, client) {

    const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

  
    const commandList = commandFiles.map(file => {
      const command = require(path.join(__dirname, '../commands', file));
      return `**/${command.data.name}** - ${command.data.description}`;
    }).join('\n');
    const queue = client.distube.getQueue(interaction.guildId);
    const queueStatus = queue ? `Songs in Queue: ${queue.songs.length}` : 'No songs in queue';

    const embed1 = new EmbedBuilder()
      .setTitle('Bot Information')
      .setDescription(
        `Developed By: **𝗯𝗼𝗺𝗶𝗲**\n`+
        `Node Version: **v20.12.2**\n` +
        `Server Name: **${interaction.guild.name}**\n` +
        `Total Members: **${interaction.guild.memberCount}**\n` +
        `DisTube Status: **${queueStatus}**`
      )
      .setColor('#bc8787');

  
    const embed2 = new EmbedBuilder()
      .setTitle('Available Commands')
      .setDescription(commandList || 'No commands available.')
      .setColor('#bc8787'); 

  
    await interaction.reply({ embeds: [embed1, embed2] });
  },
};
