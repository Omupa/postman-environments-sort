let fileSystem = require('fs');

const encodeUTF8 = 'utf8';
const folder = 'C:/Users/Ilegra/Documents/Postman files to sort/';

fileSystem.readdirSync(folder, encodeUTF8).forEach(fileName => {
	const filePath = folder + fileName;

	const fileData = fileSystem.readFileSync(filePath, encodeUTF8);
	let enviroment = JSON.parse(fileData);

	enviroment.values.sort(dynamicSort("key"));

	fileSystem.writeFile(filePath, JSON.stringify(enviroment), () => { });
});

function dynamicSort(property) {
	var sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a, b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
};