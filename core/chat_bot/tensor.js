class Tensor {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => new Array(cols).fill(0));
    }

    load(data) {
        this.rows = data.length;
        this.cols = data[0].length;
        this.data = data;
    }

    add( other ){
        this.requireSameShape(other);
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] + other.data[i][j];
            }
        }
        return out;
    }

    transpose( ){
        let out = new Tensor(this.cols, this.rows);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[j][i] = this.data[i][j];
            }
        }
        return out;
    }

    scale( s ){
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] * s;
            }
        }
        return out;
    }

    matrixMultiply( other ){
        if (this.cols !== other.rows) {
            throw new Error("Matrix multiplication shape mismatch: " + this.rows + "x" + this.cols
                + " vs " + other.rows + "x" + other.cols);
        }
        let out = new Tensor(this.rows, other.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let k = 0; k < this.cols; k++) {
                let a = this.data[i][k];
                if (a === 0.0) {
                    continue;
                }
                for (let j = 0; j < other.cols; j++) {
                    out.data[i][j] += a * other.data[k][j];
                }
            }
        }
        return out;
    }

    addConstant( constant ){
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] + constant[i][j];
            }
        }
        return out;
    }

    selectRows( indices ){
        let out = new Tensor(indices.length, this.cols);
        for (let i = 0; i < indices.length; i++) {
            out.data[i] = [...(this.data[indices[i]] || [])];
        }
        return out;
    }

    addRowBroadcast( bias ){
        if (bias.rows !== 1 || bias.cols !== this.cols) {
            throw new Error("bias must be 1x" + this.cols);
        }
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] + bias.data[0][j];
            }
        }
        return out;
    }

    sliceColumns( from, to ){
        let out = new Tensor(this.rows, to - from);
        for (let i = 0; i < this.rows; i++){
            for (let j = from; j < to; j++){
                out.data[i][j - from] = this.data[i][j];
            }
        }
        return out;
    }

    softmaxRows( ){
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            let max = -Number.MAX_VALUE;
            for (let j = 0; j < this.cols; j++){
                max = Math.max(max, this.data[i][j]);
            }
            let sum = 0;
            for (let j = 0; j < this.cols; j++) {
                let e = Math.exp(this.data[i][j] - max);
                out.data[i][j] = e;
                sum += e;
            }
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] /= sum;
            }
        }
        return out;
    }

    static concatColumns( parts ){
        let r = parts[0].rows;
        let totalColumns = 0;
        for (let i = 0; i < parts.length; i++){
            totalColumns += parts[i].cols;
        }
        let out = new Tensor(r, totalColumns);
        let offset = 0;
        for (let p = 0; p < parts.length; p++) {
            let t = parts[p];
            for (let i = 0; i < r; i++){
                for (let j = 0; j < t.cols; j++){
                    out.data[i][offset + j] = t.data[i][j];
                }
            }
            offset += t.cols;
        }
        return out;
    }

    meanRows( ){
        let out = new Tensor(this.rows, 1);
        for (let i = 0; i < this.rows; i++) {
            let s = 0;
            for (let j = 0; j < this.cols; j++){
                s += this.data[i][j];
            }
            out.data[i][0] = s / this.cols;
        }
        return out;
    }

    subtractColumnBroadcast( columnVector ){
        if (columnVector.rows !== this.rows || columnVector.cols !== 1) {
            throw new Error("expected " + this.rows + "x1 column vector");
        }
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                out.data[i][j] = this.data[i][j] - columnVector.data[i][0];
            }
        }
        return out;
    }

    elementWiseMultiplication( other ){
        this.requireSameShape(other);
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                out.data[i][j] = this.data[i][j] * other.data[i][j];
            }
        }
        return out;
    }

    squareRootEpsilon( epsilon ){
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = Math.sqrt(this.data[i][j] + epsilon);
            }
        }
        return out;
    }

    divisionColumnBroadcast( columnVector ){
        if (columnVector.rows !== this.rows || columnVector.cols !== 1) {
            throw new Error("expected " + this.rows + "x1 column vector");
        }
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] / columnVector.data[i][0];
            }
        }
        return out;
    }

    multiplyRowBroadcast( rowVector ){
        if (rowVector.rows !== 1 || rowVector.cols !== this.cols) {
            throw new Error("expected 1x" + this.cols + " row vector");
        }
        let out = new Tensor(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                out.data[i][j] = this.data[i][j] * rowVector.data[0][j];
            }
        }
        return out;
    }

    gelu( ){
        let out = new Tensor(this.rows, this.cols);
        let tanhArgument = Array.from({ length: this.rows }, () => new Array(this.cols));
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = this.data[i][j];
                let inner = Math.sqrt(2.0 / Math.PI) * (x + 0.044715 * x * x * x);
                let t = Math.tanh(inner);
                tanhArgument[i][j] = t;
                out.data[i][j] = 0.5 * x * (1.0 + t);
            }
        }
        return out;
    }

    requireSameShape( other ){
        if (other.rows !== this.rows || other.cols !== this.cols) {
            throw new Error("shape mismatch: " + this.rows + "x" + this.cols
                + " vs " + other.rows + "x" + other.cols);
        }
    }

    static random(rows, cols, scale, randomGaussian) {
        let t = new Tensor(rows, cols);
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                t.data[i][j] = randomGaussian.nextGaussian() * scale;
            }
        }
        return t;
    }

    static zeros(rows, cols){
        return new Tensor(rows, cols);
    }

    static load( data ){
        let t = new Tensor(data.length, data[0].length);
        for (let i = 0; i < t.rows; i++){
            for (let j = 0; j < t.cols; j++){
                t.data[i][j] = data[i][j];
            }
        }
        return t;
    }
}