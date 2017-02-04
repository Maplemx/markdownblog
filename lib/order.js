function order (arr, orderBy, desc) {
    let tmp = {},
        tmpKeys = [];
    for (let i = 0; i < arr.length; i++) {
        let orderByValue = arr[i];
        for (let j = 0; j < orderBy.length; j++) {
            orderByValue = orderByValue[orderBy[j]];
        }
        tmp[orderByValue] = arr[i];
        tmpKeys.push(orderByValue);
    }
    switch (typeof(tmpKeys[0])) {
        default:
            tmpKeys = tmpKeys.sort(
                    (firstItem, secondItem) => {
                        if (desc) {
                            return Number(secondItem) - Number(firstItem);
                        } else {
                            return Number(firstItem) - Number(secondItem);
                        }
                    }
                );
            break;
        case 'string':
            tmpKeys = tmpKeys.sort(
                    (firstItem, secondItem) => {
                        if (desc) {
                            return secondItem.charCodeAt() - firstItem.charCodeAt();
                        } else {
                            return firstItem.charCodeAt() - secondItem.charCodeAt();
                        }
                    }
                );
            break;
    }
    let result = [];
    for (let i =0; i < tmpKeys.length; i++) {
        result.push(tmp[tmpKeys[i]]);
    }
    return result;
}

module.exports = order;