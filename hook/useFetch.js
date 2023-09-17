import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          'X-RapidAPI-Key': '84504eb924msha78289d33dd25adp1895aejsneb85f3a3db3b',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
    
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
          
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchData();
    },[endpoint])
    
    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch}
}

export default useFetch;