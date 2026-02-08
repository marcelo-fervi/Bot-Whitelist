# Bot-Whitelist
Discord BOT designed to provide FiveM server owners some must-needed features:
- Custom RP whitelist
- Suggestions with automated reactions
- Support through Tickets or Voice Calls
- Embeds
- Receive authorization to see the community after emoji verification

If you really want to use the whitelist feature, be sure to adapt some MySQL queries to your server database, as this fork has been customized to rely on some unique database table structures.

And don't forget to import the `discord` table located at `sql/discord.sql` into your MySQL database if you're going to use the whitelist feature.

## How to start it
If it's your first time doing it, don't forget to edit `src/config.js` with valid informations to ensure the bot works properly.
Run `install.bat` (*only needed if it's your first time doing it or if you deleted the `node_modules` folder*).
Then run `start.bat` to actually start the bot.