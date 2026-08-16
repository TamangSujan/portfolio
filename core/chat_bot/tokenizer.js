class Tokenizer {
    static PATTERN = /[A-Za-z]+(?:'[A-Za-z]+)?|[0-9]+|[^\sA-Za-z0-9]/g;
    constructor() {
        this.EOS = "<EOS>";
        this.PAD = "<PAD>";
        this.UNK = "<UNK>";

        this.WORD_ID = new Map( );
        this.ID_WORD = new Map( );

        for(let i=0; i<TokenizerData.words.length; i++){
            this.WORD_ID.set(TokenizerData.words[i], TokenizerData.ids[i]);
            this.ID_WORD.set(TokenizerData.ids[i], TokenizerData.words[i]);
        }
    }

    static splitToWords( question ){
        let tokens = [];
        for (const match of question.matchAll(Tokenizer.PATTERN)) {
            tokens.push( match[0].toLowerCase());
        }
        return tokens;
    }

    encodeWords( tokens ){
        let ids = [];
        for( let index in tokens ){
            ids.push(this.WORD_ID.get(tokens.at(index)));
        }
        return ids;
    }

    eosId() {
        return this.WORD_ID.get(this.EOS);
    }

    decode( tokenIds ) {
        let string = '';
        for (let i=0; i < tokenIds.length; i++) {
            let w = this.word( tokenIds[i] );
            if (w === this.PAD || w === this.EOS) {
                continue;
            }
            if( w === 'i' ){
                w = 'I';
            }
            let isPunctuation = !this.isLetterOrDigit(w);
            if(isPunctuation){
                string += w + " ";
            }else{
                string += " " + w;
            }
        }
        return string;
    }

    word( id ) {
        if (id < 0 || id >= this.ID_WORD.size) return this.UNK;
        return this.ID_WORD.get(id);
    }

    isLetterOrDigit(char) {
        if (!char) return false;
        const code = char.charCodeAt(0);
        return (code >= 65 && code <= 90) ||
            (code >= 97 && code <= 122) ||
            (code >= 48 && code <= 57);
    }
}