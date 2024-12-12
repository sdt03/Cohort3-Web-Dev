function findLargestElement(numbers){
    let largestElemet = numbers[0];
    for(let i=0;i<numbers.length;i++){
        if(numbers[i]>largestElemet) largestElemet = numbers[i];
        return largestElemet;
    }
}

module.exports = findLargestElement;