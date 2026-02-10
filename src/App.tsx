import { Route, Routes } from 'react-router-dom'
import { AppHeader } from '@components/layout/AppHeader'
import { CharacterDetailsPage } from '@pages/CharacterDetailsPage'
import { CharactersPage } from '@pages/CharactersPage'
import { NotFoundPage } from '@pages/NotFoundPage'

const App = () => {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/people/:id" element={<CharacterDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
