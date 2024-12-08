function isAnagram(str1, str2){
    str1 = str1.sort();
    str2 = str2.sort();

    if(str1===str2) return true;
    else return false;
}

isAnagram("rasp", "spar");