export  const formatWeight = (weight:number):string=>{
        if(weight < 1){
            const gramms = weight*1000;
            const formattedGramms = gramms % 1 === 0 ? gramms.toString() : gramms.toFixed(1).replace(/\.0$/, '');
            return `${formattedGramms} gr.`
        }else{
            const formattedKilo = weight % 1 === 0 ? weight.toString() : weight.toFixed(2).replace(/\.00$/, '');
            return `${formattedKilo} kilo.`
        }
    }