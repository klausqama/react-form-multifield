import Footer from '../components/Footer/Footer' // Importa il componente Footer
import Header from '../components/Header/Header' // Importa il componente Header
import Main from '../components/Main/Main.jsx' // Importa il componente Main

function App() {
  return (
    <>
      <Header /> {/* Renderizza il componente Header */}
      <Main /> {/* Renderizza il componente Main */}
      <Footer /> {/* Renderizza il componente Footer */}
    </>
  )
}

export default App // Esporta il componente App come default