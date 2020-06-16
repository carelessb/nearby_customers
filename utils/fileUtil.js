const fs = require('fs');
const readline = require('readline');
const {Point} = require('./../utils/Point');

async function readCustomersFromFile(filename) {

    if(!fs.existsSync(filename)){
        throw new Error(`The file '${filename}' has not been found`);
    }
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const customers = [];

    for await (const line of rl) {
        processLineOfCustomerFile(line, customers)
    }

    return customers;
}

function processLineOfCustomerFile(line, customers) {
    try {
        const customer = JSON.parse(line);
        customer.coordinates = new Point(customer.latitude, customer.longitude);
        customers.push(customer);
    }
    catch(e) {
        if(isPossibleJsonArrayFormat(line) ) {
            throw new Error('The input file does not have the right format. Does it contain a JSON array format?');
        }
        else {
            throw e;
        }
    }
}


function writeInvitedCustomersToFile(fileContent, outputFile) {
    fs.writeFileSync(outputFile, fileContent, "utf8");
}


function isPossibleJsonArrayFormat(line) {
    return hasOpeningSquareBracket(line);
}

function hasOpeningSquareBracket(line) {
    const openingSquareBracketPattern = /\s*\[/;
    return openingSquareBracketPattern.test(line);
}


module.exports = {
    readCustomersFromFile: readCustomersFromFile,
    writeInvitedCustomersToFile: writeInvitedCustomersToFile
}