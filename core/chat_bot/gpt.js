class Gpt {
    constructor( modelDimension, numberOfAttentionHeads, numberOfLayers, hiddenDimension, contextLength ) {
        this.contextLength = contextLength;
        this.temperature = 0.3;
        this.tokenizer = new Tokenizer( );
        this.tokenEmbedding = Tensor.load( TensorData.tokenEmbeddingTensorData );
        this.positionEmbedding = Tensor.load( TensorData.positionEmbeddingTensorData );
        this.transformers = [];
        for (let i = 0; i < numberOfLayers; i++) {
            let transformer = Transformer.load(TransformerData.data[i], modelDimension, numberOfAttentionHeads, hiddenDimension);
            this.transformers.push(transformer);
        }
        this.weightOutputTensor = Tensor.load( TensorData.gptWeightData );
        this.biasOutputTensor = Tensor.load( TensorData.gptBiasData );
    }
    trimToContextLength( ids ){
        let idSize = ids.length;
        let trimStartIndex = Math.max(0, idSize - this.contextLength);
        let trimIds = [];
        for( let index = trimStartIndex; index < idSize - trimStartIndex; index++){
            trimIds.push(ids.at(index));
        }
        return trimIds;
    }
    generate( prompt ){
        let tokens = Tokenizer.splitToWords( prompt );
        let ids = this.tokenizer.encodeWords( tokens );
        let generatedTokens = [];
        for(let index=0; index<MAX_GENERATED_TOKENS; index++){
            let contextIds = this.trimToContextLength( ids );
            let logits = this.forwardLogits( contextIds );
            let lastRow = logits.data[logits.rows - 1];
            let nextId = this.sampleFromLogits(lastRow, this.temperature, 3);
            if (nextId === this.tokenizer.eosId( ) ){
                break;
            }
            ids.push(nextId);
            generatedTokens.push(nextId);
        }
        let answer = this.tokenizer.decode(generatedTokens);
        if( answer === '' ){
            return "Sorry, currently I do not understand your question.";
        }
        answer = answer.trim();
        return answer.charAt(0).toUpperCase() + answer.slice(1) + ".";
    }

    forwardLogits( tokenIds ){
        let sequenceLength = tokenIds.length;
        let positions = this.getPositions( sequenceLength );
        let tokenEmbeddingTensor = this.tokenEmbedding.selectRows( tokenIds );
        let positionEmbeddingTensor = this.positionEmbedding.selectRows( positions );
        let x = tokenEmbeddingTensor.add( positionEmbeddingTensor );
        let mask = buildCasualMask( sequenceLength );
        for( let i=0; i<this.transformers.length; i++ ) {
            let transformer = this.transformers[i];
            x = transformer.forward(x, mask);
        }
        return x.matrixMultiply(this.weightOutputTensor).addRowBroadcast(this.biasOutputTensor);
    }

    sampleFromLogits( logits, temperature, topK = 3 ){
        let n = logits.length;

        if (temperature <= 0.0) {
            let best = 0;
            for (let i = 1; i < n; i++) {
                if (logits[i] > logits[best]) best = i;
            }
            return best;
        }

        let max = -Number.MAX_VALUE;
        for (let i = 0; i < n; i++) {
            max = Math.max(max, logits[i]);
        }
        let probabilities = new Array(n);
        let sum = 0;
        for (let i = 0; i < n; i++) {
            let e = Math.exp((logits[i] - max) / Math.max(1e-6, temperature));
            probabilities[i] = e;
            sum += e;
        }
        for (let i = 0; i < n; i++) {
            probabilities[i] /= sum;
        }

        // keep only the topK highest-probability tokens
        let indices = [...Array(n).keys()].sort((a, b) => probabilities[b] - probabilities[a]);
        let kept = indices.slice(0, Math.min(topK, n));
        let keptSum = kept.reduce((s, i) => s + probabilities[i], 0);

        let r = Math.random() * keptSum;
        let cumulative = 0;
        for (let i of kept) {
            cumulative += probabilities[i];
            if (r <= cumulative) return i;
        }
        return kept[kept.length - 1];
    }

    getPositions( length ){
        let positions = [];
        for(let i=0; i<length; i++){
            positions[i] = i;
        }
        return positions;
    }
}