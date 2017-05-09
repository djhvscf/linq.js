var Utils = (function (module) {
    module.isFunction = function (func) {
        if (func === undefined || func === null || typeof func !== "function") {
            throw new Error("[filter parameter] must be of type function that returns boolean.");
        }
    };

    module.deepCompare = function(firstObject, secondObject) {
        var typeToCompare = typeof firstObject;
        //Comparing Type
        if (typeToCompare !== typeof secondObject) {
            return false;
        }
        //Comparing undefined
        if (typeToCompare === "undefined") {
            return true;
        }

        //Comparing Constructor
        if (firstObject.constructor !== secondObject.constructor) {
            return false;
        }

        //Comparing using toString() for primitive types and Date, Regex
        if (typeToCompare === "boolean" 
            || typeToCompare === "function" 
            || typeToCompare === "number" 
            || typeToCompare === "string" 
            || firstObject instanceof Date 
            || firstObject instanceof RegExp) {
                return firstObject.toString() === secondObject.toString();
            }

        //Comparing Arrays
        if (firstObject.constructor === Array) {
            return deepCompareArray(firstObject, secondObject);
        }

        //Comparing Nulls
        if (firstObject === null && secondObject === null) {
            return true;
        }

        //Only one is null
        if (firstObject === null || secondObject === null) {
            return false;
        }

        //Ensure Objects Have Same Number of Properties
        if (!hasSameNumberOfProperties(firstObject, secondObject)) {
            return false;
        }

        //Comparing Properties
        for (var key in firstObject) {
            if (firstObject[key] !== secondObject[key])
                return false;
        }

        return true;
    };

    module.hasSameNumberOfProperties = function (firstObject, secondObject) {
        var firstObjectPropertiesCount = 0;
        var secondObjectPropertiesCount = 0;

        for (var item in firstObject) {
            firstObjectPropertiesCount++;
        }

        for (var item in secondObject) {        
            secondObjectPropertiesCount++;
        }

        return firstObjectPropertiesCount === secondObjectPropertiesCount;
    };

    module.deepCompareArray = function () {
        if (firstArray.constructor !== Array || secondArray.constructor !== Array) {
            throw new Error("[deepCompareArray] function parameters must be an arrays.")
        }

        if (firstArray.length !== secondArray.length) {
            return false;
        }

        for (var item in firstArray) {
            if (Utils.deepCompare(firstArray[item], secondArray[item]) === false)
                return false;
        }

        return true;
    };

    module.orderPrimitivesArray = function (array, isDescending) {
        var typeToCompare = typeof array[0];
        var isNotOrderedYet = false;

        for (var c = 0; c < array.length; c++) {
            if (c === (array.length - 1)) {
                if (isNotOrderedYet === false) {
                    break;
                }
                else {
                    c = -1;
                    isNotOrderedYet = false;
                    continue;
                }
            }

            if (typeof array[c] !== typeToCompare || typeof array[c + 1] !== typeToCompare) {
                throw new Error("[orderBy function] All elements must be of the same type.");
            }

            if (orderValues(array, array[c], array[c + 1], c, c + 1, isDescending) === true) {
                isNotOrderedYet = true;
            }
        }

        return array;
    };
    
    module.orderValues = function (array, firstValue, secondValue, firstIndex, secondIndex, isDescending) {
        if (typeof firstValue === "string") {
            var comparisonResult = firstValue.localeCompare(secondValue);
            if (isDescending === true) {
                if (comparisonResult < 0) {
                    array.swapValues(firstIndex, secondIndex);
                    return true;
                }
            } else {
                if (comparisonResult > 0) {
                    array.swapValues(firstIndex, secondIndex);
                    return true;
                }
            }
        } else {
            if (typeof firstValue === "number" && isNaN(firstValue) && !isNaN(secondValue)) {
                array.swapValues(firstIndex, secondIndex);
                return true;
            }

            if (isDescending === true) {
                if (secondValue > firstValue) {
                    array.swapValues(firstIndex, secondIndex);
                    return true;
                }
            } else {
                if (secondValue < firstValue) {
                    array.swapValues(firstIndex, secondIndex);
                    return true;
                }
            }
        }

        return false;
    };

    module.joinMatchedObjects = function (firstObject, secondObject) {
        var returnedObject = {};
        var skippedKeys = [];
        
        for (var key in firstObject) {
            var isOfTypeString = typeof firstObject[key] === "string";

            eval("returnedObject." + key + " = " + (isOfTypeString ? "'" + firstObject[key] + "'" : firstObject[key]));

            if (secondObject[key] !== undefined) {
                skippedKeys.push(key);
            }
        }

        for (var key in secondObject) {
            var isOfTypeString = typeof secondObject[key] === typeof "string";

            if (skippedKeys.firstOrDefault(o => o === key) === null) {
                eval("returnedObject." + key + " = " + (isOfTypeString ? "'" + secondObject[key] + "'" : secondObject[key]));
            } else {
                var indexToUse = 1;
                while (true) {
                    var isAvailable = firstObject[key + indexToUse] === undefined;
                    if (isAvailable === true) {                    
                        break;
                    }
                    indexToUse++;
                }
                eval("returnedObject." + key + indexToUse + " = " + (isOfTypeString ? "'" + secondObject[key] + "'" : secondObject[key]));
            }
        }
        return returnedObject;
    };

    module.orderObjectsArray = function (array, filter, isDescending) {
        var filterType = typeof (filter);
        if (filterType !== "string" && filterType !== "function") {
            throw new Error("[orderBy function] [filter] must be of type string that represent a property name which should be exists in each of array elements. Or a function that return the value to sort.");
        }

        var orderingType;
        var isNotOrderedYet = false;
        var ignoredFromSortingList = [];

        for (var c = 0; c < array.length; c++) {
            if (c === (array.length - 1)) {
                if (isNotOrderedYet === false) {
                    break;
                } else {
                    c = -1;
                    isNotOrderedYet = false;
                    continue;
                }
            }

            var firstValue = filterType === "string" ? eval("array[c]." + filter) : filter(array[c]);
            var secondValue = filterType === "string" ? eval("array[c + 1]." + filter) : filter(array[c + 1]);
            var isFirstItemRemoved = false;
            var isSecondItemRemoved = false;

            if (firstValue === undefined || firstValue === null) {
                isFirstItemRemoved = true;
                ignoredFromSortingList.push(array[c]);
                array.splice(c, 1);
            }

            if (secondValue === undefined || secondValue === null) {
                isSecondItemRemoved = true;
                ignoredFromSortingList.push(array[c + 1]);
                array.splice(c + 1, 1);
            }

            if (isFirstItemRemoved === true || isSecondItemRemoved === true) {
                isNotOrderedYet = true;
                c--;
                continue;
            }

            if (orderingType === undefined || orderingType === null) {
                orderingType = typeof firstValue;
            }

            if (typeof firstValue !== orderingType || typeof secondValue !== orderingType) {
                throw new Error("[orderBy function] All elements must having " + filter + " property of the same type, null or undefined.");
            }

            if (orderValues(array, firstValue, secondValue, c, c + 1, isDescending === true) === true) {
                isNotOrderedYet = true;
            }
        }

        return array.concat(ignoredFromSortingList);
    };

    return module;
}(Utils || {}));