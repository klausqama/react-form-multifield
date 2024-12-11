import PostCard from '../PostCard/PostCard' // Importa il componente PostCard
import style from './Main.module.css' // Importa gli stili CSS per il componente Main
import { initialPosts } from '../../src/posts.js' // Importa initialPosts dal file posts.js
import Tags from '../Tags/Tags.jsx' // Importa il componente Tags
import { useEffect, useState } from 'react' // Importa useEffect e useState da React
import Button from '../Button/Button.jsx' // Importa il componente Button

// Dati iniziali del form
const initialFormData = {
  title: '',
  image: '',
  content: '',
  tags: '',
  category: '',
  published: true
}

export default function Main() {
  const [posts, setPosts] = useState(initialPosts) // Stato per i post
  const [publishedPosts, setPublishedPosts] = useState([]) // Stato per i post pubblicati
  const [tags, setTags] = useState([]) // Stato per i tag
  const [formData, setFormData] = useState(initialFormData) // Stato per i dati del form

  // Effetto per aggiornare i post pubblicati e i tag
  useEffect(() => {
    setPublishedPosts(posts.filter((post) => post.published === true)) // Filtra i post pubblicati
    const tagsItems = []
    posts.forEach(post => {
      const postTags = post.tags
      console.log(postTags)
      postTags.forEach((tag) => {
        if (!tagsItems.includes(tag)) {
          tagsItems.push(tag)
        }
      })
    })
    setTags(tagsItems) // Aggiorna i tag
  }, [posts])

  // Effetto per loggare quando si crea un post pubblico o non pubblico
  useEffect(() => {
    console.log(`Stai creando un post ${formData.published ? 'pubblico' : 'non pubblico'}`)
  }, [formData.published])

  // Funzione per aggiungere un post
  function addPost(e) {
    e.preventDefault()
    const post = {
      id: Date.now(),
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    }
    setPosts([...posts, post]) // Aggiungi il nuovo post
    setFormData(initialFormData) // Resetta i dati del form
  }

  // Funzione per eliminare un post
  function deletePost(id) {
    setPublishedPosts(publishedPosts.filter(post => post.id !== id)) // Filtra i post pubblicati
  }

  // Funzione per gestire i cambiamenti nei dati del form
  function handleFormData(e) {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
 // console.log('tags',tags)
 return (
  <main>
    <section className={style.section}>
      <div className="container">
        {/* Form per aggiungere un nuovo post */}
        <form onSubmit={addPost} action="" className='form'>
          <div>
            <label htmlFor="title">Titolo</label>
            <input 
              onChange={handleFormData} 
              id='title' 
              name='title' 
              value={formData.title} 
              type="text" 
              placeholder='Titolo del post' 
            />
          </div>
          <div>
            <label htmlFor="image">Immagine (src)</label>
            <input 
              onChange={handleFormData} 
              type='text' 
              name="image" 
              id="image" 
              value={formData.image} 
              placeholder='Immagine del post'
            />
          </div>
          <div>
            <label htmlFor="category">Categoria</label>
            <select 
              value={formData.category} 
              onChange={handleFormData} 
              name="category" 
              id="category"
            >
              <option value="">Seleziona categoria</option>
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="express">Express</option>
              <option value="react">React</option>
            </select>
          </div>
          <div>
            <label htmlFor="content">Contenuto</label>
            <textarea 
              onChange={handleFormData} 
              value={formData.content} 
              name="content" 
              id="content" 
              placeholder='Contenuto del post'
            ></textarea>
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <input 
              onChange={handleFormData} 
              id='tags' 
              type="text" 
              value={formData.tags} 
              name='tags' 
              placeholder='Tag del post' 
            />
          </div>
          <div>
            <input 
              onChange={handleFormData} 
              type="checkbox" 
              checked={formData.published} 
              id='published' 
              name='published' 
            />
            <label htmlFor="published">Pubblicato</label>
          </div>
          <Button text='Salva' /> {/* Bottone per salvare il post */}
        </form>
      </div>
      <div className="container">
        <h1 className={style.section_title}>Il mio blog</h1> {/* Titolo della sezione */}
      </div>
      <div className="container">
        <Tags className={style.tags_centered} tags={tags} /> {/* Componente per visualizzare i tag */}
      </div>
      <div className="container">
        <div className="row">
          { publishedPosts.map((el) => (
            <div key={el.id} className="col-4">
              <PostCard onDelete={() => deletePost(el.id)} post={el} /> {/* Componente per visualizzare i post */}
            </div>
          ))}          
        </div>
      </div>
    </section>
  </main>
);
  };
 