import Main from "../../components/Main/Main";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HistoryProvider } from "../../hooks/History";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-side-main h-screen w-full text-sm md:text-base">
      <HistoryProvider>
        <Sidebar />
        <Main />
      </HistoryProvider>
    </div>
  );
}
