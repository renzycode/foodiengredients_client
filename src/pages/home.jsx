import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import {MySwal} from "../components/myswal";
import LoadingCard from "../components/loadingCard"; 
import { getCurrentServer } from "../hooks/getCurrentServer";

export const Home = () =>{
    const server = getCurrentServer();
    const [recipes,setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState([]);
    const userId = useGetUserId();
    const [loading, setLoading] = useState(true);

    const fetchSavedRecipe = async () => {
        try {
            const response = await axios.get(`${server}/recipes/savedRecipes/id/${userId}`);
            const savedRecipesArray = response.data.map((r) => r.recipeId.toString());
            setSavedRecipes(savedRecipesArray);
        } catch (error) {
            // console.log(error);
        }
    };

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`${server}/recipes`);
            setRecipes(response.data);
            setLoading(false);
        } catch (error) {
            // console.log(error);
        }
    };

    const saveRecipe = async (recipeId) => {
        if (!userId) {
            MySwal.fire({
                icon: 'info',
                title: 'Save error',
                text: "Please login first so that you can save the recipes",
            });
            return;
        }
        try {
            await axios.post(`${server}/recipes/save`, {
                userId,
                recipeId,
            });
            fetchRecipe();
            fetchSavedRecipe();
        } catch (error) {
            // console.log(error);
        }
    };

    const unSaveRecipe = async (recipeId) => {
        try {
            await axios.post(`${server}/recipes/unsave`, {
                userId,
                recipeId,
            });
            fetchRecipe();
            fetchSavedRecipe();
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        fetchRecipe();
        fetchSavedRecipe();
    },[])

    return(
        <div className="pt-5 pb-5 d-flex justify-content-center home-container">
            <div className="mt-4 col-12 col-xl-4 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                {
                    loading? (
                        <LoadingCard/>
                    ) : (
                        recipes.map((r) => {
                                return (
                                <div key={r._id}>
                                    <div className="col-12">
                                        <div className="card mx-4 my-4 my-card">
                                            <img className="card-img-top" src={`data:image/${r.image.extName};base64,${r.image.imageData}`} alt="Card image cap"/>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <h5 className="card-title my-title">{r.name}</h5>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                    </svg>
                                                </div>
                                                <p className="card-text">
                                                    Ingredients: {
                                                        r.ingredients.map((i, index) => (
                                                            <span key={index}>{i}, </span>
                                                        ))
                                                    }
                                                </p>
                                                <p className="card-text">
                                                    {r.instructions}
                                                </p>
                                                <p className="card-text">
                                                    {r.cookingTime} Minute(s)
                                                </p>
                                                <p className="card-text" style={{ fontSize: '11px' }}>
                                                    Created by: {r.userOwner.username} 
                                                </p>
                                                <div className="d-flex justify-content-end">
                                                { 
                                                    savedRecipes.includes(r._id) ? (
                                                        <button onClick={() => {unSaveRecipe(r._id)}} style={{ border: 'none', background: 'none'}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-heart-fill text-warning" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => {saveRecipe(r._id)}} style={{ border: 'none', background: 'none'}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-heart text-warning" viewBox="0 0 16 16">
                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                            </svg>
                                                        </button>
                                                    )
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
}