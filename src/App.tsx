import {CacheProvider} from "@shared/context";
import {MainPage} from "@pages-fsd";

function App() {
    return (
        <CacheProvider>
            <MainPage/>
        </CacheProvider>
    )
}

export default App
