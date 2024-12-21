import { Window, WindowContext } from './components/Window'
import { Shooter } from './components/Shooter'

export const App = () => {
  return (
    <WindowContext.Provider value={{width: window.innerWidth, height: window.innerHeight}}>
      <Window>
        <Shooter/>
      </Window>
    </WindowContext.Provider>
  )
}

export default App
