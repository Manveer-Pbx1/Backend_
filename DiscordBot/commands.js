//make your own commands!
//refer to: https://discord.js.org/docs/packages/discord.js/main
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "oye",
    description: 'shouts "OYE" ',
  },
];

const rest = new REST({ version: "10" }).setToken(
  "MTIxODYwMDEzNTI3ODIwMjkxNg.GLpx7X.5DPufSzYiBvBEuMqRP8cwidF1w0I5BZzC7C_RA"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1218600135278202916"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}) ();
