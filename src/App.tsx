import { Layer, Text } from 'react-konva'
import { Window, WindowContext } from './components/Window'
import { Shooter } from './components/Shooter'

export const App = () => {
  return (
    <WindowContext.Provider value={{width: window.innerWidth, height: window.innerHeight}}>
      <Window>
        <Layer>
          <Shooter></Shooter>
        </Layer>
      </Window>
    </WindowContext.Provider>
  )
}

export default App
