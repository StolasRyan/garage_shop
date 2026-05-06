export const getStatusText=(status:string, currentStepName?:string)=>{
    switch(status){
        case 'generating':
            return 'Generation started';
        case 'loading':
            return `Generating ${currentStepName}`;
        case 'success':
            return 'Generation completed!';
        case 'error':
            return 'Generation failed';
        default:
            return 'Waiting...';
    }
}