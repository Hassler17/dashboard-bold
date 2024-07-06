import Home from "@/pages/Home";
import { DataProvider } from '../context/DataContext';

export default function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}
