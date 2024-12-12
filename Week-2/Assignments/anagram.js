function isAnagram(str1, str2){
    if(str1.length !== str2.length) return false;
    else{
        str1 = str1.toLowerCase().split('').sort().join('');
        str2 = str2.toLowerCase().split('').sort().join('');
        
        if(str1===str2) return true;
        else false;
    }
}