//Counter Without SetInterval

let counter = 0;
const updateCounter = () =>{
    counter++;
    console.log(counter)

    setTimeout(updateCounter, 1000);
}

module.exports = updateCounter;