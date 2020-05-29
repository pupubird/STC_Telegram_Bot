exports.array_to_chunks = function (arr, chunk_size) {
    let output = []
    for (let i = 0; i < arr.length; i += chunk_size) {
        output.push(arr.slice(i, i + chunk_size));
    }
    return output
}

