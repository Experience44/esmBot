const request = require("request-promise-native");
const faceapp = require("faceapp");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image with a face to make it look young!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    const downloadedImage = await request({ uri: image, encoding: null });
    const faceImage = await faceapp.process(downloadedImage, "young").catch(error => {
      console.log(error);
      return message.reply("I couldn't find a face!");
    });
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: faceImage,
        name: "young.png"
      }]
    });
  }
};

exports.aliases = [];
