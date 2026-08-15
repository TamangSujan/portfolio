class Transformer {
    LN_EPS = 1e-5;
    constructor( dModel, nHeads, dHidden, randomGaussian) {

        this.numberOfHeads = nHeads;
        this.headDimension = dModel / nHeads;

        if (dModel % nHeads !== 0) throw new Error("dModel must be divisible by nHeads");

        let attentionScale = Math.sqrt(2.0 / dModel);
        let feedForwardScale = Math.sqrt(2.0 / dModel);

        this.Wq = Tensor.random(dModel, dModel, attentionScale, randomGaussian);
        this.Wk = Tensor.random(dModel, dModel, attentionScale, randomGaussian);
        this.Wv = Tensor.random(dModel, dModel, attentionScale, randomGaussian);
        this.Wo = Tensor.random(dModel, dModel, attentionScale, randomGaussian);

        this.W1 = Tensor.random(dModel, dHidden, feedForwardScale, randomGaussian);
        this.b1 = Tensor.zeros(1, dHidden);
        this.W2 = Tensor.random(dHidden, dModel, Math.sqrt(2.0 / dHidden), randomGaussian);
        this.b2 = Tensor.zeros(1, dModel);

        this.ln1Gamma = this.onesRow(dModel);
        this.ln1Beta = Tensor.zeros(1, dModel);
        this.ln2Gamma = this.onesRow(dModel);
        this.ln2Beta = Tensor.zeros(1, dModel);
    }

    onesRow(cols){
        let t = Tensor.zeros(1, cols);
        for (let j = 0; j < cols; j++) t.data[0][j] = 1.0;
        return t;
    }

    forward( x, causalMask ){
        let attentionOutput = this.selfAttention(x, causalMask);
        let residual1 = x.add(attentionOutput);
        let normalized = this.layerNormalization(residual1, this.ln1Gamma, this.ln1Beta);

        let feedForward = normalized.matrixMultiply(this.W1)
                                        .addRowBroadcast(this.b1)
                                        .gelu().matrixMultiply(this.W2)
                                        .addRowBroadcast(this.b2);
        let residual2 = normalized.add(feedForward);
        return this.layerNormalization(residual2, this.ln2Gamma, this.ln2Beta);
    }

    selfAttention(x, casualMask){
        let Q = x.matrixMultiply(this.Wq);
        let K = x.matrixMultiply(this.Wk);
        let V = x.matrixMultiply(this.Wv);

        let headOutputs = [];
        let scale = 1.0 / Math.sqrt(this.headDimension);
        for (let h = 0; h < this.numberOfHeads; h++) {
            let from = h * this.headDimension, to = from + this.headDimension;
            let Qh = Q.sliceColumns(from, to);
            let Kh = K.sliceColumns(from, to);
            let Vh = V.sliceColumns(from, to);

            let scores = Qh.matrixMultiply(Kh.transpose()).scale(scale).addConstant(casualMask);
            let attention = scores.softmaxRows();
            let headOut = attention.matrixMultiply(Vh);
            headOutputs.push(headOut);
        }
        let concatenated = Tensor.concatColumns(headOutputs);
        return concatenated.matrixMultiply(this.Wo);
    }

    layerNormalization(x, gamma, beta){
        let mean = x.meanRows();
        let centered = x.subtractColumnBroadcast(mean);
        let variance = centered.elementWiseMultiplication(centered).meanRows();
        let std = variance.squareRootEpsilon(this.LN_EPS);
        let normalized = centered.divisionColumnBroadcast(std);
        return normalized.multiplyRowBroadcast(gamma).addRowBroadcast(beta);
    }

    static load( data, modelDimension, numberOfHeads, numberOfHidden ) {
        let transformer = new Transformer(modelDimension, numberOfHeads, numberOfHidden, new Random());
        transformer.Wq.load(data[0]);
        transformer.Wk.load(data[1]);
        transformer.Wv.load(data[2]);
        transformer.Wo.load(data[3]);
        transformer.W1.load(data[4]);
        transformer.b1.load(data[5]);
        transformer.W2.load(data[6]);
        transformer.b2.load(data[7]);
        transformer.ln1Gamma.load(data[8]);
        transformer.ln1Beta.load(data[9]);
        transformer.ln2Gamma.load(data[10]);
        transformer.ln2Beta.load(data[11]);
        return transformer;
    }
}

function buildCasualMask(length) {
    let mask = [];
    for (let i = 0; i < length; i++) {
        mask[i] = [];
        for (let j = 0; j < length; j++) {
            mask[i][j] = (j > i) ? -1e9 : 0.0;
        }
    }
    return mask;
}