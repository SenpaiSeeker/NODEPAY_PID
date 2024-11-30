const fs = require('fs');
const readline = require('readline');
const inquirer = require('inquirer');
const chalk = require('chalk'); // For gradient color display

// Function to decode the base64 banner
function decodeBanner(encodedBanner) {
  const decoded = Buffer.from(encodedBanner, 'base64').toString('utf-8');
  return decoded;
}

// Replace this with your own base64-encoded banner (Make sure to encode it correctly!)
const encodedBanner = 'CgorLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKwp8IOKWiOKWiOKWiOKWiOKWiOKWiOKVlyDilojilojilojilojilojilojilZcg4paI4paI4paI4paI4paI4paI4paI4paI4pWX4paI4paI4pWXICAgIOKWiOKWiOKWiOKVlyAgIOKWiOKWiOKWiOKVlyDilojilojilojilojilojilZcg4paI4paI4pWXICAgICB8CnzilojilojilZTilZDilZDilZDilojilojilZfilojilojilZTilZDilZDilojilojilZfilZrilZDilZDilojilojilZTilZDilZDilZ3ilojilojilZEgICAg4paI4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKVlOKVkOKVkOKWiOKWiOKVl+KWiOKWiOKVkSAgICAgfAp84paI4paI4pWRICAg4paI4paI4pWR4paI4paI4paI4paI4paI4paI4pWU4pWdICAg4paI4paI4pWRICAg4paI4paI4pWRICAgIOKWiOKWiOKVlOKWiOKWiOKWiOKWiOKVlOKWiOKWiOKVkeKWiOKWiOKWiOKWiOKWiOKWiOKWiOKVkeKWiOKWiOKVkSAgICAgfAp84paI4paI4pWRICAg4paI4paI4pWR4paI4paI4pWU4pWQ4pWQ4pWQ4pWdICAgIOKWiOKWiOKVkSAgIOKWiOKWiOKVkSAgICDilojilojilZHilZrilojilojilZTilZ3ilojilojilZHilojilojilZTilZDilZDilojilojilZHilojilojilZEgICAgIHwKfOKVmuKWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkSAgICAgICAg4paI4paI4pWRICAg4paI4paI4pWRICAgIOKWiOKWiOKVkSDilZrilZDilZ0g4paI4paI4pWR4paI4paI4pWRICDilojilojilZHilojilojilojilojilojilojilojilZd8Cnwg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdIOKVmuKVkOKVnSAgICAgICAg4pWa4pWQ4pWdICAg4pWa4pWQ4pWdICAgIOKVmuKVkOKVnSAgICAg4pWa4pWQ4pWd4pWa4pWQ4pWdICDilZrilZDilZ3ilZrilZDilZDilZDilZDilZDilZDilZ18CnwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8Cnwg4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKWiOKWiOKWiOKWiOKVlyAg4paI4paI4paI4paI4paI4paI4pWXIOKWiOKWiOKVlyAgICDilojilojilZcgICAg4paI4paI4pWXICAg4paI4paI4pWX4paI4paI4paI4paI4paI4paI4paI4paI4pWXICB8CnzilojilojilZTilZDilZDilZDilZDilZ0g4paI4paI4pWU4pWQ4pWQ4paI4paI4pWX4paI4paI4pWU4pWQ4pWQ4pWQ4paI4paI4pWX4paI4paI4pWRICAgIOKWiOKWiOKVkSAgICDilZrilojilojilZcg4paI4paI4pWU4pWd4pWa4pWQ4pWQ4paI4paI4pWU4pWQ4pWQ4pWdICB8CnzilojilojilZEgIOKWiOKWiOKWiOKVl+KWiOKWiOKWiOKWiOKWiOKWiOKVlOKVneKWiOKWiOKVkSAgIOKWiOKWiOKVkeKWiOKWiOKVkSDilojilZcg4paI4paI4pWRICAgICDilZrilojilojilojilojilZTilZ0gICAg4paI4paI4pWRICAgICB8CnzilojilojilZEgICDilojilojilZHilojilojilZTilZDilZDilojilojilZfilojilojilZEgICDilojilojilZHilojilojilZHilojilojilojilZfilojilojilZEgICAgICDilZrilojilojilZTilZ0gICAgIOKWiOKWiOKVkSAgICAgfAp84pWa4paI4paI4paI4paI4paI4paI4pWU4pWd4paI4paI4pWRICDilojilojilZHilZrilojilojilojilojilojilojilZTilZ3ilZrilojilojilojilZTilojilojilojilZTilZ0gICAgICAg4paI4paI4pWRICAgICAg4paI4paI4pWRICAgICB8Cnwg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWdIOKVmuKVkOKVnSAg4pWa4pWQ4pWdIOKVmuKVkOKVkOKVkOKVkOKVkOKVnSAg4pWa4pWQ4pWQ4pWd4pWa4pWQ4pWQ4pWdICAgICAgICDilZrilZDilZ0gICAgICDilZrilZDilZ0gICAgIHwKKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSsKCg=='; // Example encoded string, replace with your banner's base64

async function readLines(filename) {
  const fileStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const lines = [];
  for await (const line of rl) lines.push(line.trim());
  return lines;
}

function displayHeader() {
  process.stdout.write('\x1Bc');
  const banner = decodeBanner(encodedBanner); // Decode the banner
  
  // Apply gradient color to the decoded banner (You can adjust this as you like)
  const gradientBanner = chalk.hex('#FF6347').bold(banner); // Example: apply a color (red-orange)

  // Display the decoded banner with gradient colors
  console.log(gradientBanner);
  console.log();  // Add an empty line for spacing
  // Additional information and links
  console.log(chalk.yellow('CREATED BY : DR ABDUL MATIN KARIMI: ⨭ ') + chalk.green('https://t.me/doctor_amk'));
  console.log(chalk.white('DOWNLOAD LATEST HACKS HERE ➤ ') + chalk.green('https://t.me/optimalgrowYT'));
  console.log(chalk.red('LEARN HACKING HERE ➤ ') + chalk.green('https://www.youtube.com/@optimalgrowYT/videos'));
  console.log(chalk.red('DOWNLOAD MORE HACKS ➤ ') + chalk.green('https://github.com/OptimalGrowYT'));
  console.log(chalk.yellow('PASTE YOUR [TOKEN] INTO TOKEN.TXT FILE AND PRESS START '));
  console.log(chalk.white('BUY NODEPAY REFERAL FROM HERE ➤ ') + chalk.green('https://t.me/doctor_amk'));
  console.log(chalk.green('                  [𝍖𝍖𝍖 NODEPAY HACK MASTER 𝍖𝍖𝍖]                  '));
  console.log();  // Add an empty line for spacing
}

async function askAccountType() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'accountType',
      message: 'How many accounts would you like to use?',
      choices: ['Single Account', 'Multiple Accounts'],
    },
  ]);

  console.log('');

  return answers.accountType;
}

async function askProxyMode() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useProxy',
      message: 'Would you like to use proxies?',
      default: true,
    },
  ]);

  console.log('');

  return answers.useProxy;
}

module.exports = { readLines, displayHeader, askAccountType, askProxyMode };
