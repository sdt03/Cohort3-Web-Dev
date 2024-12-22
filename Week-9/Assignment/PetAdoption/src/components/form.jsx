import React, {useState} from "react";
import {validation} from "../utils/validation"
import AdopterData from "./AdopterData"

const PetAdoption = () => {
    const [formData, setFormData] = useState([]);
    const [value, setValue] = useState({
        petName: "",
        petType: "",
        breed: "",
        adopterName: "",
        email: "",
        phone: ""
    });

    const [showTable, setShowTable] = useState(false);
    const {petName, petType, breed, adopterName, email, phone} = value;
    console.log(petName, petType, breed, adopterName, email, phone);

    const [errors, setErrors] = useState({
        petName: "",
        petType: "",
        breed: "",
        adopterName: "",
        email: "",
        phone: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValue((prevValues)=>({
            ...prevValues,
            [name]: value,
        }));

        let errorsCopy = {...errors};
        const error = validation(name, value, errorsCopy);
        setErrors(error);
    }

    const handleSubmit = () => {
        console.log(
            `Pet Name: ${petName}
            Pet Type: ${petType}
            Breed: ${breed}
            Adopter Name: ${adopterName}
            Email: ${email}
            Phone: ${phone}`
        );
        if(!petName || !breed || !adopterName || !email || !phone) {
            alert("Please fill out all fields");
            return;
        }

        const hasErrors = Object.values(errors).some((val)=>val);
        if(hasErrors){
            alert("Please fill out all fields")
            return;
        }

        const data = {petName, petType, breed, adopterName, email, phone};
        setFormData((prevData)=>[...prevData, data]);
        setShowTable(true);
        setValue({
            petName: "",
            petType: "",
            breed: "",
            adopterName: "",
            email: "",
            phone: ""
        })
        setErrors({
            petName: "",
            petType: "",
            breed: "",
            adopterName: "",
            email: "",
            phone: ""
        })
    }

    const handleGoBack = () => setShowTable(!showTable);

    if(!showTable){
        return(
            <div className="form">
                <div>
                    <label htmlFor="petName">Pet Name</label>
                    <input
                        type="text"
                        name="petName"
                        placeholder="Pet Name"
                        value={petName}
                        onChange={handleChange}
                    /> 
                    <small>{errors.petName}</small>
                </div>
                <div>
                    <label htmlFor="petType">Pet Type</label>
                    <select value={petType} name="petType" onChange={handleChange}>
                        <option value="Dog">DOg</option>
                        <option value="Cat">Cat</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Bird">Bird</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="breed">Breed</label>
                    <input
                        type="text"
                        name="breed"
                        placeholder="Breed"
                        value={breed}
                        onChange={handleChange}
                    />
                    <small>{errors.breed}</small>
                </div>
                <div>
                    <label htmlFor="adopterName">Adopter Name</label>
                    <input
                        type="text"
                        name="adopterName"
                        placeholder="Your Name"
                        value={adopterName}
                        onChange={handleChange}
                    />
                    <small>{errors.adopterName}</small>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={handleChange}
                    />
                    <small> {errors.email} </small>
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={handleChange}
                    />
                    <small>{errors.phone}</small>
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        )
    }
    return <AdopterData formData={formData} handleGoBack={handleGoBack}></AdopterData>
}

export default PetAdoption