import axios from "axios";
import { useRef, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { MySwal} from "../components/myswal";
import { useCookies } from "react-cookie";
import { getCurrentServer } from "../hooks/getCurrentServer";

export const CreateRecipe = () => {
    const server = getCurrentServer();
    const navigate = useNavigate();
    const userId = useGetUserId();
    const [extName,setExtName] = useState("");
    const [imageUrl,setImageUrl] = useState(null);
    const [imageBase64,setImageBase64] = useState(null);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [""],
        instructions: "",
        cookingTime: 0,
        userOwner: userId,
    });
    const imageRef = useRef();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (e,i) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[i] = value;
        setRecipe({ ...recipe, ingredients: ingredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients , ""] });
    };

    const removeIngredient = () => {
        setRecipe({ ...recipe, ingredients: [""] });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const create = await axios.post(`${server}/recipes/create`,{
                'name': recipe.name,
                'imageExt': extName,
                'imageData': imageBase64,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'cookingTime': recipe.cookingTime,
                'userOwner': recipe.userOwner,
            });
            if(create.data.status=='success'){
                navigate("/create-recipe?create=success");
                setRecipe({
                    name: "",
                    ingredients: [""],  
                    instructions: "",
                    cookingTime: 0,
                    userOwner: userId,
                });
                setExtName("");
                imageRef.current.value = null;
                setImageUrl(undefined);
                MySwal.fire({
                    icon: 'success',
                    title: 'Create Recipe',
                    text: create.data.message,
                })
            }else{
                MySwal.fire({
                    icon: 'error',
                    title: 'Create Recipe',
                    text: ""+create.data.message+"",
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // console.log(imageName);
    const handleImageChange = async (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        if (file.size > 100000) {
            // Handle the case where the image is too large
            console.log("Image size exceeds the limit");
            setExtName("");
            imageRef.current.value = null;
            setImageUrl(undefined);
            MySwal.fire({
                icon: 'error',
                title: 'Create Recipe',
                text: "Image too large to upload. Sorry.",
            })
            return;
        }
        var imgName = e.target.files[0]["name"];
        var extName = imgName.split('.').pop();
        setExtName(extName);
        setImageUrl(URL.createObjectURL(file));
        const base64 = await convertToBase64(file);
        setImageBase64(base64.split(',').pop());
        console.log(base64.split(',').pop());
    }

    return (
        <div className="pt-5 pb-5 d-flex justify-content-center mx-3 text-light">
            <div className="mt-5 col-12 col-lg-6 col-xl-6 col-md-8 col-sm-12 col-xs-12">
                <h2>Create Recipe</h2>
                <form onSubmit={onSubmit}>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={recipe.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image (max 100kb)</label>
                        <input ref={imageRef} type="file" className="form-control" name="image" onChange={(e) => handleImageChange(e)}/>
                    </div>
                    <img className="card-img-preview mb-3 rounded border bg-light" src=
                        {
                            imageUrl
                            ? 
                            imageUrl
                            :
                            "assets/noimg.png"
                        } alt="Card image cap"/>
                    <div className="">
                        <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    </div>
                    <div className="col-auto mb-2">
                        <button type="button" className="btn btn-dark border border-light" onClick={addIngredient}>Add Ingredients</button>
                        <button type="button" className="btn btn-danger ms-1" onClick={removeIngredient}>Clear</button>
                    </div>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div className="mb-2" key={index}>
                            <input 
                                className="form-control"
                                type="text"
                                id="ingredients"
                                name="ingredients"
                                value={ingredient}
                                onChange={(e) => {handleIngredientChange(e,index)} }
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Instructions</label>
                        <textarea
                            className="form-control"
                            name="instructions"
                            id="instructions"
                            value={recipe.instructions}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Cooking Time Minute(s)</label>
                        <input
                            className="form-control"
                            type="number"
                            id="cookingTime"
                            name="cookingTime"
                            value={recipe.cookingTime}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark border border-light">Submit</button>
                </form>
            </div>
        </div>
    );
};
