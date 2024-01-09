import React, {useState , useEffect} from "react"
export default function Meme(){
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])
    
    function getMemeImage(){
        if (allMemes.length === 0) {
            console.error("No meme templates available");
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const randomMeme = allMemes[randomIndex]

        setMeme({
            ...meme,
            randomImage: randomMeme.url
        })
    }

    return(
        <div>
            <main>
                <form className="form">
                    <input type="text" placeholder="Top text" className="form--input"/>
                    <input type="text" placeholder="Bottom text" className="form--input"/>
                    <button type="button" className="form--button" onClick={getMemeImage}>Get a new meme image  🖼</button>
                    <img src={meme.randomImage} className="meme--image"></img>
                </form>
            </main>
        </div>
    )
}