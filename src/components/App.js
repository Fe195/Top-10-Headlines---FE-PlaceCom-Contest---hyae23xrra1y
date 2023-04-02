import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => { 
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState();
  console.log(newsData);   
  useEffect(() => {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=27be98956903c44034a662b6343e0694&max=10&lang=en`)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setNewsData(data.articles);
        setLoading(false);
      });
  }, [category]);


  return (
    <div id="main">
<h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (<p className='loader'>Loading...</p>): 
      (<ol>
        {newsData.map((newsItem, index) => (
          <li key={index}>
            <img className='news-img' src={newsItem.image} alt=""/>
            <section className='new-title-content-author'>
              <h3 className='news-title'>{newsItem.title}</h3>
              <section className='new-content-author'>
                <p className='news-description'>{newsItem.description}</p>
                <p className='news-source'><strong>Source:</strong> {newsItem.source.name}</p>
              </section>
            </section>
          </li>
        ))}
      </ol>)}
      
    </div>
  )
}


export default App;

