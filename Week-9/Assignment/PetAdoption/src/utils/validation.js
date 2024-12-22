export const validation = (name, value, errors) =>{
    switch(name){
        case "petName":
            errors.petName =
                value.length < 3 ? "Pet Name must be atleast 3 characters" : "";
            break;
        
        case "breed":
            errors.breed = 
                value.length < 3 ? "Breed name must be atleast 3 characters" : "";
            break;
        
        case "adoptersName":
            errors.adopters =
                value.length < 3 ? "Adopters Name must be atleast 3 characters" : "";
            break;

        case "email":
            errors.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "" : "Invalid Email ID";
            break;

        case "phone":
            errors.phone = /^\d{10}$/.test(value) ? "" : "Invalid phone number"
            break;

        default:
            break;
    }
    return errors;
};

