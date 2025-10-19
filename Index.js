import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import fetch from "node-fetch";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = "1429225565478457426";

client.once("ready", () => {
  console.log(`✅ Zalogowano jako ${client.user.tag}`);
  sendColor();
  setInterval(sendColor, 5 * 60 * 1000); // co 5 minut
});

async function sendColor() {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  const colorImage = `https://singlecolorimage.com/get/${color.substring(1)}/600x200`;

  const embed = new EmbedBuilder()
    .setTitle("🎨 Losowy kolor")
    .setDescription(`Kod HEX: **${color}**`)
    .setImage(colorImage)
    .setColor(color);

  const channel = await client.channels.fetch(CHANNEL_ID);
  if (channel) channel.send({ embeds: [embed] });
}

client.login(process.env.TOKEN);
