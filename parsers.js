const formidable = require('formidable');
const fs = require('fs');

const parse = (data) => {
    const form = formidable( { multiples: true });
    form.parse('data', (err, fields, files) => {
        fs.readFile(data, function read(err, data) {
            const values = data.toString().trim().split(";");
            const result = {};
            values.forEach((item) => {
                const parsedItem = item.replace(":", ";");
                const [key, value] = parsedItem.split(";");
                const parsedValue = Number(value);
                if (!Number.isNaN(parsedValue)) {
                    result[key] = parsedValue;
                } else {
                    const subValues = value.split(",");
                    result[key] = {};
                    subValues.forEach((subItem) => {
                        const [subKey, subValue] = subItem.split(":");
                        result[key][subKey] = Number(subValue);
                    });
                }
            });
            return res
            .json({
                result: result
            });
        });
    });
};

module.exports = {
    parse,
};