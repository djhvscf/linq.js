/// <summary>Swap values for two array indexes.</summary>
/// <param name="firstIndex" type="Number">The index of first value.</param>
/// <param name="secondIndex" type="Number">The index of second value.</param>
/// <returns type="Array"/>
Array.prototype.swapValues = function (firstIndex, secondIndex) {
    if (this.length < (firstIndex > secondIndex ? firstIndex : secondIndex)) {
        throw new Error("[swap function] Array length must be greater than passed indexes.");
    }

    var temp = this[firstIndex];
    this[firstIndex] = this[secondIndex];
    this[secondIndex] = temp;

    return this;
};

/// <summary>Check that array is not (undefined, null or length < 1).</summary>
/// <returns type="Boolean"/>
Array.prototype.isValidArray = function () {
    return this.length >= 1;
};

/// <summary>Filters a sequence of values based on a predicate.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// <returns type="Array"/>
Array.prototype.where = function (filter) {
    if (!this.isValidArray()) {
        return this;
    }

    Utils.isFunction(filter);

    var returnedList = [];
    for (var c = 0; c < this.length; c++) {

        var filterResult = filter(this[c]);

        if (typeof filterResult !== "boolean")
            throw new Error("where clause accepts only a function that returns boolean value");

        if (filter(this[c]) === true)
            returnedList.push(this[c]);
    }

    return returnedList;
};

/// <summary>Projects each element of a sequence into a new form.</summary>
/// <param name="filter" type="function">A transform function to apply to each element.</param>
/// <returns type="Array"/>
Array.prototype.select = function (selector) {
    if (!this.isValidArray())
        return this;

    Utils.isFunction(selector);

    var returnedList = [];
    for (var c = 0; c < this.length; c++) {
        returnedList.push(selector(this[c]));
    }

    return returnedList;
};

/// <signature>
/// <summary>Returns the first element of the sequence that satisfies a condition or null if no such element is found.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// <returns type="Object"/>
/// </signature>
/// <signature>
/// <summary>Returns the first element of a sequence, or null if the sequence contains no elements.</summary>
/// <returns type="Object"/>
/// </signature>
Array.prototype.firstOrDefault = function (filter) {
    if (filter === undefined || filter === null) {
        if (this.isValidArray())
            return this[0];
        else
            return null;
    }

    else if (typeof filter !== "function")
        throw new Error("[firstOrNull function] [filter parameter] must be of type function that returns boolean, null or undefined.");

    else {
        for (var c = 0; c < this.length; c++) {
            var filterResult = filter(this[c]);

            if (typeof filterResult !== "boolean")
                throw new Error("[firstOrNull function] [filter parameter] must be of type function that returns boolean, null or undefined.");

            if (filterResult === true)
                return this[c];
        }
        return null;
    }
};

/// <signature>
/// <summary>Returns the last element of the sequence that satisfies a condition or a default value if no such element is found.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// <returns type="Object"/>
/// </signature>
/// <signature>
/// <summary>Returns the last element of a sequence, or a default value if the sequence contains no elements.</summary>
/// <returns type="Object"/>
/// </signature>
Array.prototype.lastOrDefault = function (filter) {
    if (filter === undefined || filter === null) {
        if (this.isValidArray())
            return this[this.length - 1];
        else
            return null;
    }

    else if (typeof filter !== "function")
        throw new Error("[lastOrDefault function] [filter parameter] must be of type function that returns boolean, null or undefined.");

    else {
        for (var c = this.length - 1 ; c >= 0 ; c--) {
            var filterResult = filter(this[c]);

            if (typeof filterResult !== "boolean")
                throw new Error("[lastOrDefault function] [filter parameter] must be of type function that returns boolean, null or undefined.");

            if (filterResult === true)
                return this[c];
        }
        return null;
    }
};

/// <summary>Returns a specified number of contiguous elements from the start of a sequence.</summary>
/// <param name="number" type="Number">The number of elements to return.</param>
/// <returns type="Array"/>

Array.prototype.take = function (number) {
    if ((!this.isValidArray()) || (number > this.length))
        return this;

    if (number === undefined || number === null || typeof number !== "number" || number < 1)
        throw new Error("[take function] [number parameter] must be of type number and greater than 0.");

    var returnedList = [];

    for (var c = 0; c < number ; c++) {
        returnedList.push(this[c]);
    }

    return returnedList;
};

/// <summary>Returns elements from a sequence as long as a specified condition is true.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// <returns type="Array"/>
Array.prototype.takeWhile = function (filter) {
    if (!this.isValidArray())
        return this;

    Utils.isFunction(filter);

    var returnedList = [];
    for (var c = 0; c < this.length; c++) {

        var filterResult = filter(this[c]);

        if (typeof filterResult !== "boolean")
            throw new Error("where clause accepts only a function that returns boolean value");

        if (filter(this[c]) === true)
            returnedList.push(this[c]);
        else
            break;
    }

    return returnedList;
};

/// <summary>Bypasses a specified number of elements in a sequence and then returns the remaining elements.</summary>
/// <param name="number" type="Number">The number of elements to Bypassed.</param>
/// <returns type="Array"/>
Array.prototype.skip = function (number) {
    if (!this.isValidArray())
        return this;

    if (number === undefined || number === null || typeof number !== "number" || number < 1)
        throw new Error("[skip function] [number parameter] must be of type number and greater than 0.");

    if (number >= this.length)
        return [];

    var returnedList = [];

    for (var c = (number) ; c < this.length ; c++) {
        returnedList.push(this[c]);
    }

    return returnedList;
};

/// <summary>Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// <returns type="Array"/>
Array.prototype.skipWhile = function (filter) {
    if (!this.isValidArray())
        return this;

    Utils.isFunction(filter);

    var returnedList = [];
    var isSkipped = false;
    for (var c = 0; c < this.length; c++) {

        if (isSkipped === false) {

            var filterResult = filter(this[c]);

            if (typeof filterResult !== "boolean")
                throw new Error("[skipWhile function] [filter parameter] must be a function that returns boolean value");

            isSkipped = !filterResult;

        }

        if (isSkipped === true)
            returnedList.push(this[c]);
    }

    return returnedList;
};

/// <signature>
/// <summary>Sorts the elements of a sequence in ascending order.</summary>
/// <returns type="Array"/>
/// </signature>
/// <signature>
/// <summary>Sorts the elements of a sequence in ascending order according to a key.</summary>
/// <param name="filter" type="String">Property name to be used as the key in sorting.</param>
/// <returns type="Array"/>
/// </signature>
/// <signature>
/// <summary>Sorts the elements of a sequence in ascending order according to a key.</summary>
/// <param name="filter" type="function">A function that returns a value to be used as the key in sorting.</param>
/// <returns type="Array"/>
/// </signature>
Array.prototype.orderBy = function (filter) {
    if (!this.isValidArray())
        return this;

    if (filter === undefined && (typeof this[0] == "boolean" || typeof this[0] == "number" || typeof this[0] == "string")) {    
        return Utils.orderPrimitivesArray(this);
    } else {
        return Utils.orderObjectsArray(this, filter);
    }
};

/// <signature>
/// <summary>Sorts the elements of a sequence in descending order.</summary>
/// <returns type="Array"/>
/// </signature>
/// <signature>
/// <summary>Sorts the elements of a sequence in descending order according to a key.</summary>
/// <param name="filter" type="String">Property name to be used as the key in sorting.</param>
/// <returns type="Array"/>
/// </signature>
/// <signature>
/// <summary>Sorts the elements of a sequence in descending order according to a key.</summary>
/// <param name="filter" type="function">A function that returns a value to be used as the key in sorting.</param>
/// <returns type="Array"/>
/// </signature>
Array.prototype.orderByDesc = function (filter) {
    if (!this.isValidArray()) {
        return this;
    }

    if (filter === undefined && (typeof this[0] == "boolean" || typeof this[0] == "number" || typeof this[0] == "string")) {
        return Utils.orderPrimitivesArray(this, true);
    } else {
        return Utils.orderObjectsArray(this, filter, true);
    }
};

/// <signature>
/// <summary>Groups the elements of a sequence according to a specified key selector function.</summary>
/// <param name="filter" type="String">Property name to be used as the key in grouping.</param>
/// <returns type="Object">Object that contains [key] property and [value] which's an array of all grouped elements.</returns>
/// </signature>
/// <signature>
/// <summary>Groups the elements of a sequence according to a specified key selector function.</summary>
/// <param name="filter" type="function">A function that returns a value to be used as the key in grouping.</param>
/// <returns type="Object">Object that contains [key] property and [value] which's an array of all grouped elements.</returns>
/// </signature>
Array.prototype.groupBy = function (filter) {
    if (!this.isValidArray())
        return this;

    var filterType = typeof filter;
    if (filterType !== "string" && filterType !== "function")
        throw new Error("[groupBy function] [filter] must be of type string that represent a property name which should be exists in each of array elements. Or a function that return the value to sort.");

    var groupedList = [];

    for (var c = 0; c < this.length; c++) {
        var keyValue = filterType == "string" ? eval("this[c]." + filter) : filter(this[c]);

        if (keyValue && keyValue.constructor === Array)
            throw new Error("[groupBy function] key value can't be of type Array.");

        var keyFound = false;
        for (var j = 0; j < groupedList.length; j++) {

            if (Utils.deepCompare(groupedList[j].key, keyValue)) {

                groupedList[j].value.push(this[c]);
                keyFound = true;
                break;
            }
        }

        if (!keyFound)
            groupedList.push({ key: keyValue, value: [this[c]] });
    }
    return groupedList;
};

/// <summary>Remove an element from the array for given index.</summary>
/// <param name="index" type="Number">The index to remove.</param>
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

/// <signature>
/// <summary>Combines the elements of two sequences based on matching keys.</summary>
/// <param name="listToJoin" type="Array">The sequence to join.</param>
/// <param name="conditionFunction" type="function">A function that compare keys of both sequences.</param>
/// </signature>
/// <signature>
/// <summary>Combines the elements of two sequences based on matching keys and project them into a new form.</summary>
/// <param name="listToJoin" type="Array">The sequence to join.</param>
/// <param name="conditionFunction" type="function">A function that compare keys of both sequences.</param>
/// <param name="selectorFunction" type="function">A function that projects each joined elements of both sequences into a new form (Optional).</param>
/// </signature>
Array.prototype.innerJoin = function (listToJoin, conditionFunction, selectorFunction) {
    if (listToJoin === undefined || listToJoin.constructor !== Array)
        throw new Error("[innerJoin function] [listToJoin parameter] must be an instance of Array.");

    if ((!this.isValidArray()) || (!listToJoin.isValidArray()))
        return [];

    if (typeof conditionFunction !== "function")
        throw new Error("[innerJoin function] [conditionFunction parameter] must be a function that state how the objects will be linked.");

    if (selectorFunction !== undefined && typeof selectorFunction !== "function")
        throw new Error("[innerJoin function] [conditionFunction parameter] can be a function that state the structure of the new joined objects.");

    var joinedList = [];
    for (var c = 0 ; c < this.length ; c++) {
        var matchedItem = listToJoin.firstOrDefault(o => conditionFunction(this[c], o));

        if (matchedItem !== null) {

            if (selectorFunction)
                joinedList.push(selectorFunction(this[c], matchedItem));
            else
                joinedList.push(Utils.joinMatchedObjects(this[c], matchedItem));
        }
    }

    return joinedList;
};

/// <signature>
/// <summary>Combines the elements of two sequences based on matching keys if matching was found.</summary>
/// <param name="listToJoin" type="Array">The sequence to join.</param>
/// <param name="conditionFunction" type="function">A function that compare keys of both sequences.</param>
/// </signature>
/// <signature>
/// <summary>Combines the elements of two sequences based on matching keys if matching was found and project them into a new form.</summary>
/// <param name="listToJoin" type="Array">The sequence to join.</param>
/// <param name="conditionFunction" type="function">A function that compare keys of both sequences.</param>
/// <param name="selectorFunction" type="function">A function that projects each joined elements of both sequences into a new form (Optional).</param>
/// </signature>
Array.prototype.leftOuterJoin = function (listToJoin, conditionFunction, selectorFunction) {
    if (listToJoin === undefined || listToJoin.constructor !== Array)
        throw new Error("[leftOuterJoin function] [listToJoin parameter] must be an instance of Array.");

    if ((!this.isValidArray()) || (!listToJoin.isValidArray()))
        return [];

    if (typeof conditionFunction !== "function")
        throw new Error("[leftOuterJoin function] [conditionFunction parameter] must be a function that state how the objects will be linked.");

    if (selectorFunction !== undefined && typeof selectorFunction !== "function")
        throw new Error("[leftOuterJoin function] [conditionFunction parameter] can be a function that state the structure of the new joined objects.");

    var joinedList = [];
    for (var c = 0 ; c < this.length ; c++) {
        var matchedItem = listToJoin.firstOrDefault(o => conditionFunction(this[c], o));

        if (selectorFunction)
            joinedList.push(selectorFunction(this[c], matchedItem));
        else if (matchedItem !== null)
            joinedList.push(Utils.joinMatchedObjects(this[c], matchedItem));
        else
            joinedList.push(this[c]);
    }

    return joinedList;
};

/// <signature>
/// <summary>Determines whether a sequence contains any elements.</summary>
/// </signature>
/// <signature>
/// <summary>Determines whether any element of a sequence satisfies a condition.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
/// </signature>
Array.prototype.any = function(filter) {
    if (filter !== undefined && (typeof filter !== "function" || filter.length !== 1))
        throw new Error("[filter parameter] must be a function that expect an array element as a parameter and returns boolean.");

    if (!this.isValidArray())
        return false;

    if (!filter)
        return true;

    for (var c = 0; c < this.length; c++) {
        var predicate = filter(this[c]);
        if (typeof predicate !== "boolean")
            throw new Error("[filter parameter] must be a function that returns boolean.");

        if (predicate === true)
            return true;
    }
    return false;
};

/// <summary>Determines whether all element of a sequence satisfies a condition.</summary>
/// <param name="filter" type="function">A function to test each element for a condition.</param>
Array.prototype.all = function (filter) {
    if (filter === undefined || typeof filter !== "function" || filter.length !== 1)
        throw new Error("[filter parameter] must be a function that expect an array element as a parameter and returns boolean.");

    if (!this.isValidArray())
        throw new Error("Array must be initialized before using [all function].");

    for (var c = 0; c < this.length; c++) {
        var predicate = filter(this[c]);
        if (typeof predicate !== "boolean")
            throw new Error("[filter parameter] must be a function that returns boolean.");

        if (predicate === false)
            return false;
    }
    return true;
};

/// <summary>Returns the maximum value in the sequence.</summary>
/// <param name="selector" type="function">A function to return a number from a sequence element to be used in maximum calculation.</param>
Array.prototype.max = function (selector) {
    if (!this.isValidArray())
        throw new Error("Array contains no elements.");

    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");

    var max;
    for (var c = 0; c < this.length; c++) {
        var valueToCompare;
        valueToCompare = (selector ? selector(this[c]) : this[c]);

        if (typeof valueToCompare !== "number")
            throw new Error("[max function] can operate only on numbers");

        if (!max)
            max = valueToCompare;

        else if (max < valueToCompare)
            max = valueToCompare;
    }
    return max;
};

/// <summary>Returns the minimum value in the sequence.</summary>
/// <param name="selector" type="function">A function to return a number from a sequence element to be used in minimum calculation.</param>
Array.prototype.min = function (selector) {
    if (!this.isValidArray())
        throw new Error("Array contains no elements.");

    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");

    var min;
    for (var c = 0; c < this.length; c++) {
        var valueToCompare;
        valueToCompare = (selector ? selector(this[c]) : this[c]);

        if (typeof valueToCompare !== "number")
            throw new Error("[min function] can operate only on numbers");

        if (!min)
            min = valueToCompare;

        else if (min > valueToCompare)
            min = valueToCompare;
    }
    return min;
};

/// <summary>Returns the average from values in the sequence.</summary>
/// <param name="selector" type="function">A function to return a number from a sequence element to be used in average calculation.</param>
Array.prototype.average = function (selector) {
    if (!this.isValidArray())
        throw new Error("Array contains no elements.");

    if (selector && (typeof selector !== "function" || selector.length !== 1))
        throw new Error("[selector parameter] must be a function that expect an array element as parameter and returns a number.");

    var data = 0;
    for (var c = 0; c < this.length; c++) {
        valueToCompare = (selector ? selector(this[c]) : this[c]);

        if (typeof valueToCompare !== "number")
            throw new Error("[avg function] can operate only on numbers");

        data += valueToCompare;
    }

    return data/this.length;
};