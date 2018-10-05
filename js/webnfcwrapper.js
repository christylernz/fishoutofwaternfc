var NFCNotSupportedException = {
    "name": "NFCNotSupportedException",
    "message": "Unable to detect NFC support."
};

var NFCURLUndefinedException = {
    "name": "URLUndefinedException",
    "message": "An NFC Message was found with an undefined or invalid URL."
};

var NFCMessageEmptyException = {
    "name": "NFCMessageEmptyException",
    "message": "An NFC Message was found with no valid content."
};

function writeNFC(url, typeOfRecord, record) {
    if ('nfc' in navigator) {
        navigator.nfc.push({
            url: url,
            records: [{
                recordType: typeOfRecord,
                data: record
            }]
        });
        return "Success";
    } else {
        throw NFCNotSupportedException;
    }
}

function readNFC(callback) {
    if ('nfc' in navigator) {
        return navigator.nfc.watch(function (message) {
                if (typeof (message.url) != "undefined") {
                    if (message.records[0].recordType === 'empty') {
                        throw NFCMessageEmptyException;
                    } else {
                        return callback(message);
                    }
                } else {
                    throw NFCURLUndefinedException;
                }
            }, {
                mode: "any"
            })
            .then(function () {
                return "Added a watch."
            }).catch(function (err) {
                return err.name;
            });
    } else {
        throw NFCNotSupportedException;
    }
}
