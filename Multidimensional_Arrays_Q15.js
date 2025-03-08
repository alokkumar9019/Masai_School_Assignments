function printBoundaryElements(matrix) {
    if (!matrix || matrix.length === 0) {
        return;
    }

    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = [];

    for (let i = rows - 1; i >= 0; i--) {
        result.push(matrix[i][0]);
    }

    for (let i = 1; i < cols; i++) {
        result.push(matrix[0][i]);
    }

    for (let i = 1; i < rows; i++) {
        result.push(matrix[i][cols - 1]);
    }

    if (cols > 1 && rows > 1) {
        for (let i = cols - 2; i > 0; i--) {
            result.push(matrix[rows - 1][i]);
        }
    }

    console.log(result.join(", "));
}

let matrix = [
    [1, 2, 3],
    [4,5, 6],
    [7,8,9],
    
];

printBoundaryElements(matrix);
