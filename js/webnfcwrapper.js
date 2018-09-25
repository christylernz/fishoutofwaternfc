var NFCNotSupportedException = {
    "name": "NFCNotSupportedException",
    "message": "Unable to detect NFC support."
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
