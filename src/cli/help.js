import chalk from 'chalk';

const menus = {
    main: `
${chalk.greenBright('inviteList <options>')}

  ${chalk.blueBright('--version, -v:')}  ..... show package version
  ${chalk.blueBright('--help, -h:')} ........ show help menu
  ${chalk.blueBright('--inputFile, -in:')} ....... set the input customers file path. Default is /files/input.txt
  ${chalk.blueBright('--outputFile, -out:')} ....... set the output customers file path. Default is /files/output.txt
  ${chalk.blueBright('--latitude, --lat:')} ....... set the office latitude. Default is 53.339428,
  ${chalk.blueBright('--longitude, --lon:')}  ....... set the office longitude. Default is -6.257664, 
  ${chalk.blueBright('--nearbyRadius, --rad:')} ....... set the invite cutoff radius in kilometres. Default is 100
`
}

export function help() {
    console.log(menus.main)
}