import { Toaster } from "./components/ui/sonner";
import MiniTheoryOfChange from "./pages/MiniTheoryOfChange";

function App() {
  return (
    <>
      <MiniTheoryOfChange />
      <Toaster
        className="toaster group bg-primary/60 text-primary-foreground border-border rounded-md"
        position="bottom-center"
      />
    </>
  );
}

export default App;
